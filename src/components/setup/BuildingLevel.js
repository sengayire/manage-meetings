/* eslint-disable */
import React, { Component } from 'react';
import toastr from 'toastr';
import '../../assets/styles/buildingSetup.scss';
import Preview from './Preview';
import LevelsForm from './LevelsForm';
import notification from '../../../src/utils/notification';
import { ellipses, chevronIcon } from '../../utils/images/images';

class BuildingLevel extends Component {
  state = {
    levelCounter: 1,
    activeLevel: 1,
    locationStructure: {},
    numberOfLevels: 0,
    showAddLevel: true,
  }

  updateLevelsRelationship = () => {
    const { state: { levelsDetails } } = this.refs.levels;
    this.setState({ locationStructure: levelsDetails });
  }

  updateCounter = (counter) => {
    const num = this.state.levelCounter += 1;
    this.setState({
      levelCounter: counter !== undefined ? counter !== 0 ? counter : 1 : num,
      activeLevel: counter !== undefined ? counter !== 0 ? counter : 1 : num,
    });
    return this.updateLevelsRelationship();
  }

  validateLevelsDetails = () => {
    const { state: { levelsDetails } } = this.refs.levels;
    const { nameObj, tag, quantity } = levelsDetails[this.state.levelCounter - 1] || {};

    return tag && (nameObj.length === quantity) && nameObj.some(elem => elem.name);
  };

  addNewLevel = () => {
    const { updateErrorState, state: { levelsDetails },  addNewObject } = this.refs.levels;
    const { levelCounter } = this.state;

    if (!levelsDetails.length || levelsDetails[levelCounter - 1] === undefined) {
      return notification(toastr, 'error', `Please fill the form for level ${levelCounter}`)();
    }

    const isValid = this.validateLevelsDetails();
    if (isValid) {
      this.updateCounter();
      const childrenLength = document.getElementById('levels-controls').childElementCount;
      addNewObject(levelCounter)
      this.setState({
        numberOfLevels: childrenLength,
      });
    } else {
      updateErrorState(this.state.levelCounter);
    }
  }

  toggleActiveLevel = ({ target: { id } }) => {
    this.setState({
      activeLevel: Number(id),
      showAddLevel: !(this.state.levelCounter - Number(id) >= 1),
    });
  }

  sortControls = (activeLevel, index) =>
    activeLevel === index + 2 || activeLevel === index + 1
    || activeLevel === index || (activeLevel === 1 && activeLevel + 1 == index)

  displayLevelsControl = () => {
    const { levelCounter, activeLevel } = this.state;

    return (
      [...Array(levelCounter)].map((ind, index) =>
        this.sortControls(activeLevel, index) &&
        (<li
          onClick={this.toggleActiveLevel}
          className={activeLevel === index + 1 && 'active-level'}
          id={index + 1}
        >Level {index + 1}
        </li>),
      )
    );
  }

  removeLevel = data => () => this.refs.levels.removeLevelDetails(data);

  saveLevelStructure = () => {}

  show = () => {
    this.setState({
      showAddLevel: false,
      activeLevel: this.state.activeLevel - 1,
    });
  }

  render() {
    const {
      levelCounter, locationStructure, numberOfLevels, activeLevel, showAddLevel,
    } = this.state;

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
              <div className="left" onClick={this.toggleDirections}>
                {(numberOfLevels >= 3 && activeLevel > 2) && <img src={chevronIcon} alt="left scroll icon" />}
              </div>
              <div><ul id="levels-controls">
                {this.displayLevelsControl()}
                {showAddLevel && <li className="add-level"onClick={this.addNewLevel}>
                  Add Level
                </li>}
              </ul>
              </div>
              <div className="right">
                {!showAddLevel && <img src={chevronIcon} alt="right scroll icon" />}
              </div>
            </div>
            <LevelsForm
              ref="levels"
              activeLevel={this.state.activeLevel}
              updateRelationship={this.updateLevelsRelationship}
              updateCounter={this.updateCounter}
            />
          </div>
        </div>
        <Preview
          locationStructure={locationStructure}
          removeLevel={this.removeLevel}
          saveStructure={this.saveLevelStructure}
          counter={levelCounter}
          handleClick={this.props.handleClick}
        />
      </div>
    );
  }
}

export default BuildingLevel;
