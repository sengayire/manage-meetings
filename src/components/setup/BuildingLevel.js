import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/buildingSetup.scss';
import { Input } from '../commons';
import Button from '../commons/Button';
import { ellipses, walkingIcon } from '../../utils/images/images';

class BuildingSetup extends Component {
  state = {
    building: '',
    number: 0,
    buildingName: '',
  }

  handleInputChange = (event, quantity = 0) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, number: quantity });
  };

  render() {
    const { handleClickBuilding } = this.props;
    const { building, number, buildingName } = this.state;
    return (
      <div className="level-container">
        <div className="form-card">
          <div className="form-area">
            <h4>Setup your building</h4>
            <div className="form-header">
              <p>Plan the Levels within your building </p>
              <img src={ellipses} alt="level-desc" />
            </div>
            <div className="levels-desc">
              <p>Levels can be Buildings, Blocks, Floors, Wings, Rooms, etc</p>
            </div>
            <div className="levels-add-options">
              <ul className="form-options-list">
                <li className="form-option pull-left">
                  Level 1
                </li>
                <li className="form-option pull-left">
                  Add Level
                </li>
              </ul>
            </div>
            <form className="level-form">
              <Input
                type="text"
                placeholder="Building"
                labelName="Set a name for the first level"
                id="level-input-1"
                inputClass="level-input"
                name="building"
                value={building}
                onChange={this.handleInputChange}
              />
              <Input
                type="number"
                labelName="How many buildings are in your location?"
                id="level-input-2"
                inputClass="level-input num-input"
                controlsClass="num-controls"
                name="number"
                value={number}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                placeholder="eg. Epic Tower"
                labelName="Building 1 Name"
                id="level-input-building-name"
                inputClass="level-input"
                name="buildingName"
                value={buildingName}
                onChange={this.handleInputChange}
              />
              <Button
                title="Add Rooms within Building 1"
                classProp="level-btn add-room-btn"
              />
              <Button
                title="Back"
                classProp="level-btn back-btn"
              />
            </form>
          </div>
        </div>
        <div className="form-card">
          <div className="preview-area">
            <h4>Preview your structure</h4>
            <p>Click any level to expand</p>
            <span>
              <img src={walkingIcon} alt="walking-icon" />
            </span>
            <p>This is your building</p>
            <div className="structure-preview">
              <div className="form-option-preview pull-left">
                Level 1
              </div>
              <Button
                title="Epic Tower"
                classProp="preview-btn"
              />
            </div>
            <Button
              title="Save & Submit"
              classProp="back-btn save-structure"
              handleClick={handleClickBuilding}
            />
          </div>
        </div>
      </div>
    );
  }
}
BuildingSetup.propTypes = {
  handleClickBuilding: PropTypes.func.isRequired,
};

export default BuildingSetup;
