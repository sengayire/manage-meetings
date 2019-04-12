/* eslint-disable */
import React, { Component } from 'react';
import uuid from 'uuid';
import { Input } from '../commons';
import Button from '../commons/Button';
import Controls from '../helpers/Controls';

class LevelsForm extends Component {
  state = {
    levelCounter: 1,
    levelsDetails: [],
  };

  componentWillReceiveProps(prevProps) {
    this.props.activeLevel !== prevProps.activeLevel &&
      this.setState({ levelCounter: prevProps.activeLevel });
  }

  populateLevelDetails = (val, type, index) => {
    const { levelCounter, levelsDetails } = this.state;
    const { tag, quantity, id, nameObj } = levelsDetails[levelCounter - 1] || {};

    return {
      nameObj: type === 'levelName' ? this.updateChildArray(index, val) : nameObj || [],
      id: id || uuid(),
      level: levelCounter,
      parentId: levelCounter == 1 ? null : '',
      parentTitle: '',
      tag: type === 'levelTagName' ? val : tag || '',
      quantity: type === 'up' ? (val += 1) : type === 'down' && val !== 0 ? (val -= 1) : quantity,
    };
  };

  updateChildArray = (index, val) => {
    const { levelCounter, levelsDetails } = this.state;
    const { nameObj } = levelsDetails[levelCounter - 1] || {};
    let detailsPosition = nameObj;

    const updateObj = () => {
      const arr = detailsPosition;
      arr[index - 1] = {
        name: val,
        id: detailsPosition[index - 1].id,
        parentId: '',
        parentTitle: '',
        level: levelCounter,
      };
      return (detailsPosition = arr);
    };

    return !detailsPosition.length
      ? (detailsPosition[index - 1] = [
          {
            name: val,
            id: (detailsPosition && detailsPosition.id) || uuid(),
            parentId: '',
            parentTitle: '',
            level: levelCounter,
          },
        ])
      : nameObj.length >= index
        ? updateObj() // modify existing entry
        : [
            ...detailsPosition,
            {
              name: val,
              id: uuid(),
              parentId: '',
              parentTitle: '',
              level: levelCounter,
            },
          ]; // new entry
  };

  /**
   * It cancels the current level setup
   *
   * @param {object} event
   *
   * @returns {void}
   */
  cancelCurrentLevelSetup = (events)=>{
    const{cancelCurrentLevelSetup} = this.props;
    const {levelCounter} = this.state;
    if(levelCounter>1){
      events.preventDefault();
      cancelCurrentLevelSetup()
    }
  }

  /**
   * It cancels the current level setup
   *
   * @param {int} highestLevel
   *
   * @returns {void}
   */

  updateErrorState = highestLevel => {
    const { levelsDetails } = this.state;
    const { tag, quantity, nameObj } = levelsDetails[highestLevel - 1];
    const errorState = levelsDetails;
    const position = highestLevel - 1;
    let errorArray = levelsDetails.errorInput;

    if (!tag) {
      errorState[position].input = (errorArray && [...errorArray, 'tag']) || ['tag'];
    } else if (!quantity) {
      errorState[position].input = (errorArray && [...errorArray, 'quantity']) || ['quantity'];
    } else if (nameObj.length < quantity) {
      errorState[position].input = (errorArray && [...errorArray, quantity]) || [quantity];
    }

    this.setState({
      levelsDetails: errorState,
    });
  };

  handleInputChange = event => {
    event.preventDefault();

    const { levelCounter } = this.state;
    const { name, value, id } = event.target;
    const arr = this.state.levelsDetails;

    arr[levelCounter - 1] = ['up', 'down'].includes(name)
      ? this.populateLevelDetails(
          (arr[levelCounter - 1] && arr[levelCounter - 1].quantity) || 0,
          name,
        )
      : this.populateLevelDetails(value, name, id);

    this.setState({
      levelsDetails: arr,
      errorInput: null,
    });
  };

  removeLevelDetails = levelData => {
    const { level, id } = levelData;
    const { levelsDetails } = this.state;
    let arr = levelsDetails;
    const position = level - 1;

    if (arr[position].quantity === 1) {
      arr.splice(position, 1);
    } else {
      const newArr = arr[position].nameObj.filter(child => child.id !== id);
      arr[position].nameObj = newArr;
      arr[position].quantity -= 1;
    }

    this.setState({
      levelsDetails: arr,
    });
    this.props.updateCounter(arr.length);
  };

  toggleParentSelection = (parent, childPosition, type) => () => {
    const { levelCounter, levelsDetails } = this.state;
    const { name, id } = parent;
    const levels = levelsDetails;

    levels[levelCounter - 1].nameObj[childPosition - 1].parentId = type === 'add' ? id : '';
    levels[levelCounter - 1].nameObj[childPosition - 1].parentTitle = type === 'add' ? name : '';

    this.setState({
      levelsDetails: levels,
    });
  };

  renderParents = index => {
    const { levelsDetails, levelCounter } = this.state;
    const level = levelsDetails[levelCounter - 1] && levelsDetails[levelCounter - 1].nameObj;
    const parentLevels = levelsDetails[levelCounter - 2];

    if (levelCounter != 1) {
      return !level.length || !level[index] || !level[index].parentId ? (
        <div className="select-parent">
          {parentLevels.nameObj.map((parent, i) => (
            <span
              key={(i + 1).toString()}
              className="parent-list"
              onClick={this.toggleParentSelection(parent, index + 1, 'add')}
            >
              {parent.name}
            </span>
          ))}
        </div>
      ) : (
        <div className="active-parent">
          <span>{level[index].parentTitle}</span>
          <span
            className="remove-parent"
            onClick={this.toggleParentSelection(parent, index + 1, 'remove')}
          >
            x
          </span>
        </div>
      );
    }
  };

  renderError = () => <span className="error-text">This field cannot be blank</span>;

  displayLevelsInput = ({ levelCounter, levelsDetails }) => {
    const isLevel = (levelsDetails.length && levelsDetails[levelCounter - 1]) || [];
    const { errorInput = [], quantity } = isLevel;

    return (
      [...Array(quantity || 0)].map((ind, index) => {
        const error = errorInput && errorInput.includes(index + 1);

        return (
          <div className="form-input" key={index.toString()}>
            {error && this.renderError()}
            <Input
              type="text"
              placeholder="eg. Epic Tower"
              labelName="Level Name"
              key={index + levelCounter}
              id={index + 1}
              inputClass={`level-input ${error && 'error'}`}
              name="levelName"
              value={(isLevel.nameObj[index] && isLevel.nameObj[index].name) || ''}
              onChange={this.handleInputChange}
            />
            {this.renderParents(index)}
          </div>
        );
      })
    );
  };

  addNewObject = () => {};

  render() {
    const { levelCounter, levelsDetails } = this.state;
    const details = (levelsDetails.length && levelsDetails[levelCounter - 1]) || {};

    return (
      <form className="level-form">
        <div className="level-form__input">
          <label>Set a name for this level</label>
          <input
            type="text"
            placeholder="Building"
            onChange={this.handleInputChange}
            name="levelTagName"
            value={details.tag || ''}
            className="level-input"
          />
        </div>
        <div className="level-form__input">
          <label>How many of this level are in your location?</label>
          <input
            type="number"
            placeholder="0"
            onChange={this.handleInputChange}
            name="levelQuantity"
            value={details.quantity || ''}
            className="level-input"
          />
          <Controls controlsClass="num-controls" handleIncrement={this.handleInputChange} />
        </div>
        {this.displayLevelsInput(this.state)}
        <div className="level-button-div">
        <Button handleClick={this.cancelCurrentLevelSetup} title="Back" type={2} classProp="back-button" />
        <Button handleClick={this.props.addNewLevel} title="Save" type={1} classProp="save-button" />
        </div>
      </form>
    );
  }
}

export default LevelsForm;
