/* eslint-disable react/forbid-prop-types,jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button';
import { walkingIcon } from '../../utils/images/images';
import { previewData } from './../../fixtures/previewModal';
import { MrmModal } from '../commons/MrmModal';
import StructurePreviewTree from './StructurePreviewTree';
import { checkboxSlideHTML } from '../commons/CheckboxSlide';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLevel: '0',
      isChecked: false,
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

  toggleCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.structurePreview.current.toggleModal();
  };

  makeLeveActive = (id, type) => () => this.setState({ activeLevel: type === 'active' ? id : '0' });

  formatLocationStructureData = () => {
    const locationId = this.getUserLocationId();
    const { locationStructure } = this.props;
    const flattenData = [];
    locationStructure.forEach((structure) => {
      const { tag, level, nameObj } = structure;
      nameObj.forEach((child, i) => {
        const { id, name, parentId } = child;
        flattenData.push({
          id,
          name,
          level,
          parentId,
          locationId,
          position: i + 1,
          tag,
        });
      });
    });
    return flattenData;
  };

  renderDeleteIcon = (counter, values, data, child) => {
    // -1 if level does not have any child
    const checkLevelChild =
      data[values.level] &&
      data[values.level].nameObj.findIndex(elem => elem.parentId === child.id);
    // show delete icon if level does not have a child or its the current level
    const removeable =
      (counter - 1 === Number(values.level) && checkLevelChild === -1) ||
      (checkLevelChild === -1 || checkLevelChild === undefined);
    return (
      removeable && (
        <span className="remove-level" role="button" onClick={this.props.removeLevel(child)}>
          x
        </span>
      )
    );
  };

  /**
   * renders the preview of the new added structure
   * @returns {void}
   */
  renderPreviews = (data, counter) =>
    Object.entries(data).map(([key, values]) => {
      const classProp = data.length === Number(key) + 1 ? 'preview-active-btn' : 'preview-btn';
      return (
        <Fragment key={key}>
          {Number(key) + 1 === 1 ? (
            <p>This is your {values.tag}</p>
          ) : (
            <p> Within {values.tag} you can access</p>
          )}
          <div className="preview-levels">
            <div className="levels-grp">
              {values.nameObj.map((child, i) => (
                <div className="preview-btn-container" key={(i + 1).toString()}>
                  {this.renderDeleteIcon(counter, values, data, child)}
                  <span
                    className={
                      this.state.activeLevel === child.parentId ||
                      this.state.activeLevel === child.id
                        ? 'highlight-btn'
                        : classProp
                    }
                    onMouseEnter={this.makeLeveActive(child.id, 'active')}
                    onMouseLeave={this.makeLeveActive(child.id)}
                  >
                    {child.name.toString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      );
    });

  render() {
    const { isChecked } = this.state;
    const { counter, locationStructure, handleClick } = this.props;
    const isLocationStructure = locationStructure.length > 0;
    return (
      <div className="form-card">
        {checkboxSlideHTML(isChecked, this.toggleCheckbox)}
        <MrmModal
          ref={this.structurePreview}
          title="OFFICE STRUCTURE"
          type={2}
          styleClassName="preview-structure-modal"
          modalContent={
            <div>
              <StructurePreviewTree data={previewData} />
              <span
                onClick={this.toggleCheckbox}
                className="close-structure-preview"
              >
              x
              </span>
            </div>
          }
          withButton={false}
        />
        <div className="form-area">
          <h4>Preview your structure</h4>
          <p>Click any level to expand</p>
          <span>
            <img src={walkingIcon} alt="walking-icon" />
          </span>
          <div className="structure-preview">
            {isLocationStructure && this.renderPreviews(locationStructure, counter)}
            {isLocationStructure && (
              <div className="save-btn-container">
                <Button title="Save & Submit" handleClick={handleClick('RoomSetupView')} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  handleClick: PropTypes.func.isRequired,
  removeLevel: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  allLocations: PropTypes.array.isRequired,
  counter: PropTypes.number.isRequired,
  locationStructure: PropTypes.array.isRequired,
};

Preview.defaultProps = {
  user: {},
};

export default Preview;
