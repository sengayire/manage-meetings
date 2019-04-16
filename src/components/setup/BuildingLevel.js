/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-multi-assign */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import '../../assets/styles/buildingSetup.scss';
import Preview from './Preview';
import LevelsForm from './LevelsForm';
import notification from '../../../src/utils/notification';
import { ellipses, chevronIcon } from '../../utils/images/images';
import MrmModal from '../commons/MrmModal';
import SetupLevel from '../setup/SetupLevel';
import { getUserDetails, getAllLocations } from '../helpers/QueriesHelpers';

class BuildingLevel extends Component {
  state = {
    levelCounter: 1,
    activeLevel: 1,
    locationStructure: [],
    numberOfLevels: 0,
    showAddLevel: true,
    user: {},
    allLocations: [],
  };

  componentDidMount = () => {
    this.getUsersLocation();
  }

  /**
   * It queries the Apollo store to fetch user details and a list of all available locations
   *  @returns {Object}
   * @returns {array}
   */
  getUsersLocation = async () => {
    const { allLocations } = this.state;
    const user = await getUserDetails();
    const Locations = await getAllLocations();
    let locations = Object.assign({}, allLocations);
    locations = Locations;
    this.setState({
      user,
      allLocations: locations,
    });
  };

  /**
   * It creates a reference to the levelsForm component
   *
   */
  levels = createRef();

  /**
   * It creates a reference to the modal element and Component
   * and toggle it to close when the close icon is clicked
   *
   */
  levelsModal = createRef();

  toggleModal = () => {
    this.levelsModal.current.toggleModal();
  };

  updateLevelsRelationship = () => {
    const {
      state: { levelsDetails },
    } = this.levels.current;
    this.setState({ locationStructure: levelsDetails });
  };

  updateCounter = (counter) => {
    const num = (this.state.levelCounter += 1);
    this.setState({
      levelCounter: counter !== undefined ? (counter !== 0 ? counter : 1) : num,
      activeLevel: counter !== undefined ? (counter !== 0 ? counter : 1) : num,
    });
    return this.updateLevelsRelationship();
  };

  validateLevelsDetails = () => {
    const {
      state: { levelsDetails },
    } = this.levels.current;
    const { nameObj, tag, quantity } = levelsDetails[this.state.levelCounter - 1] || {};

    return tag && nameObj.length === quantity && nameObj.some(elem => elem.name);
  };

  /**
   * Adds new level
   */
  // eslint-disable-next-line consistent-return
  addNewLevel = (event) => {
    event.preventDefault();
    const { target: { className } } = event;
    const {
      updateErrorState,
      state: { levelsDetails },
      addNewObject,
    } = this.levels.current;
    const { levelCounter } = this.state;

    if (!levelsDetails.length || levelsDetails[levelCounter - 1] === undefined) {
      return notification(toastr, 'error', `Please fill the form for level ${levelCounter}`)();
    }

    const isValid = this.validateLevelsDetails();
    if (isValid) {
      if (className === 'add-level-button') { this.updateCounter(); }
      if (className !== 'add-level-button') { this.updateLevelsRelationship(); }
      const childrenLength =
        document.getElementById('levels-controls') !== null &&
        document.getElementById('levels-controls').childElementCount;
      addNewObject(levelCounter);
      this.setState({
        numberOfLevels: childrenLength,
      });
    } else {
      updateErrorState(this.state.levelCounter);
    }
  };

  /**
  * It cancels the current level setup
  *
  * @param {object} event
  *
  * @returns {void}
  */
  cancelCurrentLevelSetup = () => {
    const { state: { levelsDetails } } = this.levels.current;
    const { activeLevel, levelCounter } = this.state;
    this.setState({
      activeLevel: activeLevel - 1,
      levelCounter: levelCounter - 1,
    });
    if (levelsDetails.length > 1) {
      levelsDetails.pop();
    }
    this.displayLevelsControl();
  }

  toggleActiveLevel = ({ target: { id } }) => {
    const { levelCounter } = this.state;
    this.setState({
      activeLevel: Number(id),
      showAddLevel: !(levelCounter - Number(id) >= 1) || (Number(id) === 1 && levelCounter === 2),
    });
  };

  sortControls = (activeLevel, index) =>
    (activeLevel === index + 2 ||
    activeLevel === index + 1 ||
    activeLevel === index ||
    (activeLevel === 1 && activeLevel + 1 === index));


  displayLevelsControl = () => {
    const { levelCounter, activeLevel } = this.state;
    return [...Array(levelCounter)].map(
      (ind, index) => (this.sortControls(activeLevel, index) && (
        <li
          onClick={this.toggleActiveLevel}
          className={activeLevel === index + 1 ? 'active-level' : ''}
          id={index + 1}
          key={index.toString()}
        >
          Level {index + 1}
        </li>
      )));
  };

  removeLevel = data => () => this.levels.current.removeLevelDetails(data);

  /**
   * When called it shows the previous three levels
   * @returns {void}
   */
  selectPreviousLevel = () => {
    const { activeLevel } = this.state;
    this.setState(prevState => ({
      showAddLevel: false,
      activeLevel: prevState.activeLevel - ((activeLevel === 3) ? 1 : 3),
    }));
  }

  /**
   * When called it shows the next three levels
   * @returns {void}
   */
  selectNextLevel = () => {
    const { levelCounter, activeLevel } = this.state;
    if ((levelCounter - activeLevel) <= 3) {
      this.setState(prevState => ({
        showAddLevel: true,
        activeLevel: prevState.activeLevel + (levelCounter - activeLevel),
      }));
    } else {
      this.setState(prevState => ({ activeLevel: prevState.activeLevel + 3 }));
    }
  }

  render() {
    const {
      levelCounter,
      locationStructure,
      numberOfLevels,
      activeLevel,
      showAddLevel,
      user,
      allLocations,
    } = this.state;
    return (
      <div>
        <div className="level-container">
          <div className="form-card">
            <div className="form-area">
              <h4>Setup your building</h4>
              <div className="form-header">
                <p>Plan the Levels within your building </p>
                <div className="setup-levels" tabIndex="0">
                  <MrmModal
                    ref={this.levelsModal}
                    type={1}
                    buttonText={
                      <img src={ellipses} alt="level-desc" className="levels-modal-image" />
                    }
                    modalContent={
                      <div>
                        <SetupLevel />
                        <span onClick={this.toggleModal} className="close-modal">x</span>
                      </div>
                  }
                    className="levels-modal"
                  />
                </div>
              </div>
              <div className="levels-desc">
                <p>Levels can be Buildings, Blocks, Floors, Wings, Rooms, etc</p>
              </div>
              <div className="levels-add-options">
                <div className="left" onClick={this.selectPreviousLevel}>
                  {(numberOfLevels >= 3 && activeLevel > 2) && <img src={chevronIcon} alt="left scroll icon" />}
                </div>
                <div>
                  <ul className="form-options-list" id="levels-controls">
                    {this.displayLevelsControl()}
                    {
                      showAddLevel && (
                      <li className="add-level-button" onClick={this.addNewLevel}>
                        Add Level
                      </li>)
                    }
                  </ul>
                </div>
                <div className="right" onClick={this.selectNextLevel}>
                  {!showAddLevel && <img src={chevronIcon} alt="right scroll icon" />}
                </div>
              </div>
              <LevelsForm
                cancelCurrentLevelSetup={this.cancelCurrentLevelSetup}
                addNewLevel={this.addNewLevel}
                ref={this.levels}
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
            user={user}
            allLocations={allLocations}
            handleClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

BuildingLevel.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default BuildingLevel;
