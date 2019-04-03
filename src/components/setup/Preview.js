/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button';
import { walkingIcon } from '../../utils/images/images';

class Preview extends Component {
  state = {
    activeLevel: '0',
  };

  /**
   * gets user location id
   *
   *
   * @returns {integer}
   */
  getUserLocationId = () => {
    const {
      user: { location },
      allLocations,
    } = this.props;
    const userLocation = allLocations.filter(local => local.name === location);
    return Number(userLocation[0].id);
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
    const { counter, locationStructure, handleClick } = this.props;
    const isLocationStructure = locationStructure.length > 0;
    return (
      <div className="form-card">
        <div className="preview-area">
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
