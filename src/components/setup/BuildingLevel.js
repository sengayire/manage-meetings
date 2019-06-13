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
import { orderByLevel } from '../../utils/formatSetupData';
import stripTypeNames from '../helpers/StripTypeNames';
import { getUserDetails, getAllLocations, getRoomsStructure } from '../helpers/QueriesHelpers';

class BuildingLevel extends Component {
  state = {
    levelCounter: 1,
    activeLevel: 1,
    numberOfLevels: 0,
    showAddLevel: true,
    user: {},
    allLocations: [],
    erroredChild: '',
    previewStructure: [],
    backendStructure: '',
    flattenedStruct: [],
  };

  componentDidMount = () => {
    this.getUsersLocation();
    this.orderedStructure();
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

  orderedStructure = async () => {
    const structure = await getRoomsStructure();
    const { allStructures } = structure;
    const formattedStructure = orderByLevel(stripTypeNames(allStructures));
    this.previewBuildingStructure(formattedStructure, stripTypeNames(allStructures));
  };

  previewBuildingStructure = (formattedStructure, allStructures) => {
    this.setState({
      flattenedStruct: allStructures,
    });

    const lastChild = formattedStructure.length &&
      formattedStructure[formattedStructure.length - 1];
    const backendStructureLevel = lastChild ? lastChild.children[0].level : 1;
    this.setState({
      previewStructure: formattedStructure,
      levelCounter: backendStructureLevel,
      backendStructure: formattedStructure.length,
      activeLevel: backendStructureLevel,
    },
    () => this.levels.current.setState({ levelsDetails: this.state.previewStructure }));
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
    this.setState({ previewStructure: levelsDetails });
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
    const { children, tag, quantity } = levelsDetails[this.state.levelCounter - 1] || {};

    return tag && children.length === quantity && children.every(elem => elem.name.length);
  };

  /**
   * loops through the children within a level
   * and checks if a parent has been selected
   * @returns {array}
   * @param levelsDetails
   * @param levelCounter
   */
  validateChild = (levelsDetails, levelCounter) => {
    const error = [];
    if (levelCounter !== 1) {
      levelsDetails.forEach((currentItem) => {
        currentItem.children.forEach((child) => {
          if (child.level !== 1 && !child.parentId) {
            error.push(child.id);
          }
        });
      });
    }
    return error;
  }

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

    const details = (levelsDetails.length && levelsDetails[levelCounter - 1]) || {};
    if (details.quantity === undefined || !details.quantity) {
      return notification(toastr, 'error', "You can't have 0 levels in your location")();
    }

    const error = this.validateChild(levelsDetails, levelCounter);

    if (error.length > 0) {
      this.setState({
        erroredChild: 'missing-parent',
      });
    }

    const isValid = this.validateLevelsDetails();
    if (isValid && !error.length) {
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
      this.setState({
        previewStructure: [],
      });
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

  removeLevel = data => (singleLevel) => {
    if (singleLevel === 1) {
      this.levels.current.setState({
        showDeleteModal: true,
      }, this.levels.current.removeLevelDetails(data));
    } else {
      this.levels.current.setState({
        showDeleteModal: false,
      }, this.levels.current.removeLevelDetails(data));
    }
  };

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
      previewStructure,
      backendStructure,
      numberOfLevels,
      activeLevel,
      showAddLevel,
      user,
      allLocations,
      erroredChild,
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
                updateCounter={this.updateCounter}
                missingParent={erroredChild}
                previewBuildingStructure={this.previewBuildingStructure}
                flattenedStruct={this.state.flattenedStruct}
              />
            </div>
          </div>
          <Preview
            locationStructure={previewStructure}
            backendStructLength={backendStructure}
            removeLevel={this.removeLevel}
            saveStructure={this.saveLevelStructure}
            counter={levelCounter}
            user={user}
            allLocations={allLocations}
            handleClick={this.props.handleClick}
            getAllStructureIds={this.props.getAllStructureIds}
          />
        </div>
      </div>
    );
  }
}

BuildingLevel.propTypes = {
  handleClick: PropTypes.func.isRequired,
  getAllStructureIds: PropTypes.func.isRequired,
};

export default BuildingLevel;
