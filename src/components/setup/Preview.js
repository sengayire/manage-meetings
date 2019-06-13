/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable  no-unused-expressions */
import React, { Fragment, Component, createRef } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Button from '../commons/Button';
import { walkingIcon, chevronIcon } from '../../utils/images/images';
import MrmModal from '../commons/MrmModal';
import Tip from '../commons/Tooltip';
import StructurePreviewTree from './StructurePreviewTree';
import { checkboxSlideHTML } from '../commons/CheckboxSlide';
import notification from '../../utils/notification';
import addLevelSetup, { deleteOfficeStructure } from '../helpers/mutationHelpers/Preview';


class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLevel: '0',
      isChecked: false,
      activeLevelHover: 0,
      activeLevelPagination: 0,
      indexHistory: {},
      isSubmiting: false,
    };
  }

  /**
   * gets user location id
   *
   *
   * @returns {number}
   */
  getUserLocationId = () => {
    const {
      user: { location },
      allLocations,
    } = this.props;
    const userLocation = allLocations.filter(local => local.name === location);
    return Number(userLocation[0].id);
  };

  structurePreview = createRef();

  toggleModal = () => {
    this.structurePreview.current.toggleModal();
  };

  /**
   *
   * Toggles isChecked state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */

  toggleCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.structurePreview.current.toggleModal();
  };

  /**
   * Make level active on clicking level button
   * and undo on clicking again
   *
   * @param {integer} id
   * @param {string} type
   * @returns {function}
   */
  makeLevelActiveClick = (id, type) => () =>
    this.setState({
      activeLevel: type === 'active' && this.state.activeLevel === '0' ? id : '0',
    });

  /**
   * Make level active on hovering level button
   *
   * @param {integer} id
   * @param {string} type
   * @returns {function}
   */
  makeLevelActiveHover = (id, type) => () =>
    this.setState({
      activeLevelHover: type === 'active' ? id : 0,
    });

  /**
   * updates indices for levels on clicking previous and next buttons
   *
   * @param {object} e
   * @param {integer} index
   * @param {integer} level
   * @param {String} direction
   * @returns {object}
   */
  slide = (e, index, level, direction) => {
    let nextIndex = 0;
    if (direction === 'previous') {
      nextIndex = index - 4;
    } else {
      nextIndex = index + 1;
    }

    this.setState({
      activeLevelPagination: nextIndex,
      indexHistory: { ...this.state.indexHistory, [level]: nextIndex },
    });

    return this.state;
  };

  /**
   * check if there are more highlighted buttons on the next or previous pagination
   *
   * @param {integer} index
   * @param {integer} level
   * @param {object} data
   * @returns {object}
   */
  checkMoreHighlighted = (index, level, data = []) => {
    const iconClass = {};
    const { activeLevel, activeLevelHover } = this.state;

    for (let i = 0; i < data.length; i += 1) {
      if (
        activeLevel === data[i].parentId ||
        activeLevel === data[i].structureId ||
        (activeLevelHover === data[i].parentId && activeLevel === '0') ||
        (activeLevelHover === data[i].structureId && activeLevel === '0')
      ) {
        if (index + 3 < i) {
          iconClass.next = 'highlight-arrow-btn';
        }

        if (index > i) {
          iconClass.previous = 'highlight-arrow-btn';
        }
      }
    }

    return iconClass;
  };

  formatLocationStructureData = () => {
    const locationId = this.getUserLocationId();
    const { locationStructure, backendStructLength } = this.props;
    const newLocationStructure = locationStructure.slice(backendStructLength);
    const flattenData = [];
    newLocationStructure.forEach((structure) => {
      const { tag, level, children } = structure;
      children.forEach((child, i) => {
        const {
          structureId, name, parentId, parentTitle,
        } = child;
        flattenData.push({
          structureId,
          name,
          level,
          parentId,
          parentTitle,
          locationId,
          position: i + 1,
          tag,
        });
      });
    });
    return flattenData;
  };

  /**
   *
   * Submits level structure data in the database
   *
   * @returns {void}
   */
  saveLevelStructure = () => {
    let message;
    const flattenedData = this.formatLocationStructureData();
    const { handleClick } = this.props;

    this.setState({
      isSubmiting: true,
    });

    addLevelSetup({ flattenedData })
      .then(() => {
        /** Notify user of success of adding of level setup data */
        flattenedData.length > 1
          ? message = 'Structures added Successfully'
          : message = 'Structure added Successfully';

        notification(toastr, 'success', message)();
        // show RoomSetupView
        handleClick('RoomSetupView')();
      })
      .catch(() => {
        /** Notify user on failure to add level setup data */
        this.setState({
          isSubmiting: false,
        });
        notification(toastr, 'error', `Could not add structure${flattenedData.length > 1 ? 's' : ''}`)();
      });
  }

  listParentIds = (list) => {
    const parentIds = [];
    /* eslint-disable array-callback-return */
    list.map((value) => {
      value.children && value.children.map((child) => {
        const id = child.parentId === '' ? list[0].structureId : child.parentId;
        parentIds.push(id);
      });
    });
    return [...new Set(parentIds)];
  };


  checkIfParent = id => async () => {
    const { locationStructure, removeLevel, getAllStructureIds } = this.props;
    const parentIds = this.listParentIds(locationStructure);
    const structureId = [];
    const backendStructureIds = await getAllStructureIds();
    structureId.push(id);
    if (parentIds.includes(id)) {
      removeLevel(id)();
      if (backendStructureIds.includes(id)) {
        await deleteOfficeStructure(structureId);
      }
    } else {
      removeLevel(id)(1);
      if (backendStructureIds.includes(id)) {
        await deleteOfficeStructure(structureId);
      }
    }
  };

  renderDeleteIcon = id => (<button className="remove-level" onClick={this.checkIfParent(id)} >x</button>);

  /**
   * renders the preview of the new added structure
   * @returns {void}
   */
  renderPreviews = data =>
    Object.entries(data).map(([key, values]) => {
      let { activeLevelPagination } = this.state;
      const {
        indexHistory, activeLevel, activeLevelHover,
      } = this.state;

      const level = Number(key) + 1;
      const levelKey = parseInt(key, 10) + 1;
      const classProp = data.length === level ? 'preview-active-btn' : 'preview-btn';

      if (level in indexHistory) {
        if (activeLevelPagination !== indexHistory[level]) {
          activeLevelPagination = indexHistory[level];
        }
      }

      if (this.state.indexHistory[level] === undefined) activeLevelPagination = 0;

      const paginationIconClass = this.checkMoreHighlighted(
        activeLevelPagination,
        level,
        values.children,
      );

      return (
        <Fragment key={level}>
          {level === 1 ? (
            values && values.quantity < 2 ?
              <p>This is your {values.tag}</p> :
              <p>These are your {values.tag}s</p>
          ) : (
            <p> Within {values.tag} you can access</p>
          )}
          <span>
            <div className="preview-levels" id={level}>
              <div className="levels-grp">
                {// identify level
                values.children.map(
                  (child, index) =>
                    ((index >= 0 && index < 4 && activeLevelPagination === 0) ||
                      (activeLevelPagination === index && levelKey === level) ||
                      (activeLevelPagination + 1 === index && levelKey === level) ||
                      (activeLevelPagination + 2 === index && levelKey === level) ||
                      (activeLevelPagination + 3 === index && levelKey === level)) && (
                      <div className="preview-btn-container" key={child.structureId}>
                        {this.renderDeleteIcon(child.structureId)}
                        {index >= 1 &&
                        activeLevelPagination === index &&
                        values.children.length > 4 ? (
                          <button
                            onClick={e => this.slide(e, index, level, 'previous')}
                            className="arrow__left"
                          >
                            <img
                              src={chevronIcon}
                              className={paginationIconClass.previous}
                              alt="chevron icon"
                            />
                          </button>
                        ) : (
                          ''
                        )}
                        <button
                          className={
                            activeLevel === child.parentId ||
                            activeLevel === child.structureId ||
                            (activeLevelHover === child.parentId && activeLevel === '0') ||
                            (activeLevelHover === child.structureId && activeLevel === '0')
                              ? child.name.toString().length > 12 ? 'highlight-btn long-name' : 'highlight-btn'
                              : child.name.toString().length > 12 ? `${classProp} long-name` : classProp
                          }
                          onClick={this.makeLevelActiveClick(child.structureId, 'active')}
                          onMouseEnter={this.makeLevelActiveHover(child.structureId, 'active')}
                          onMouseLeave={this.makeLevelActiveHover(child.structureId)}
                        >
                          {child.name.toString().length > 12
                            ? Tip(child.name.toString(),
                            `${child.name.toString().substring(0, 8)} ...`) : child.name.toString()}
                        </button>
                        {(values.children.length > 4 &&
                          index < values.children.length - 1 &&
                          index === activeLevelPagination + 3) ||
                        (values.children.length > 4 && index === 3) ? (
                          <button
                            className="arrow__right"
                            onClick={e => this.slide(e, index, level, 'next')}
                          >
                            <img
                              src={chevronIcon}
                              className={paginationIconClass.next}
                              alt="chevron icon"
                            />
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          </span>
        </Fragment>
      );
    });

  render() {
    const { isChecked, isSubmiting } = this.state;
    const { counter, locationStructure } = this.props;
    const isLocationStructure = locationStructure.length > 0;
    let saveSubmitTitle = '';
    let saveBtnContainer = '';

    if (isSubmiting) {
      saveSubmitTitle = 'Submiting';
      saveBtnContainer = 'save-btn-container-disable';
    } else {
      saveSubmitTitle = 'Save & Submit';
      saveBtnContainer = 'save-btn-container';
    }

    return (
      <div className="form-card preview">
        <MrmModal
          ref={this.structurePreview}
          title="OFFICE STRUCTURE"
          type={2}
          styleClassName="preview-structure-modal"
          modalContent={
            <div>
              <StructurePreviewTree data={locationStructure} />
              <span onClick={this.toggleCheckbox} className="close-structure-preview">
                x
              </span>
            </div>
          }
          withButton={false}
        />
        <div className="switch-view">
          {isLocationStructure && checkboxSlideHTML(isChecked, this.toggleCheckbox)}
        </div>
        <div className="form-area">
          <h4>Preview your structure</h4>
          <p>Click any level to expand</p>
          <span>
            <img src={walkingIcon} alt="walking-icon" />
          </span>
          <div className="structure-preview">
            {isLocationStructure && this.renderPreviews(locationStructure, counter)}
            {isLocationStructure && (
              <div className={saveBtnContainer}>
                <Button title={saveSubmitTitle} handleClick={this.saveLevelStructure} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Preview.defaultProps = {
  user: {},
};

Preview.propTypes = {
  handleClick: PropTypes.func.isRequired,
  removeLevel: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  allLocations: PropTypes.instanceOf(Array).isRequired,
  counter: PropTypes.number.isRequired,
  locationStructure: PropTypes.instanceOf(Array).isRequired,
  backendStructLength: PropTypes.number.isRequired,
};


export default Preview;
