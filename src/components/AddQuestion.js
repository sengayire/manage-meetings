/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import moment from 'moment';
import Calendar from './commons/Calendar';
import MrmModal from '../components/commons/Modal';
import { SelectInput as Select } from './commons';
import '../assets/styles/addQuestion.scss';

/**
 * Add Question Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class AddQuestion extends Component {
  state = {
    questionType: '',
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    startTime: moment().format('HH:MM'),
    endTime: moment()
      .add(1, 'hours')
      .format('HH:MM'),
    calenderOpen: false,
    closeModal: false,
    options: [
      {
        id: '1',
        name: 'Rate',
      },
      {
        id: '2',
        name: 'Check',
      },
      {
        id: '3',
        name: 'Suggest',
      },
    ],
  };

  /**
   * It toggles the visibility of the modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * It updates the state value of closeModal to false
   * whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * It toggles the visibility of the calendar modal
   *
   * @returns {void}
   */
  calenderToggle = () => {
    const { calenderOpen } = this.state;
    this.setState({ calenderOpen: !calenderOpen });
  };

  /**
   * It updates the state with the selected start and end date
   *
   * @param {string} start
   * @param {string} end
   *
   * @returns {void}
   */
  sendDateData = (start, end) => {
    this.setState({ startDate: start, endDate: end });
    this.calenderToggle();
  };

  /**
   * It shows the start and end date in the calendar button
   *
   * @returns {JSX}
   */
  calendarIcon = () => (
    <div className="calendarIconBtn">
      <span>{`${this.state.startDate}  -  ${this.state.endDate}`}</span>
    </div>
  );

  /**
   * It handles the selected choice from the options
   *
   * @param {Object} event
   *
   * @returns {void}
   */
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /**
   * It returns the action buttons for the question modal
   *
   * @returns {JSX}
   */
  renderActionButtons = () => (
    <div className="button-container">
      <button onClick={this.handleCloseModal}>save question</button>
      <button onClick={this.handleCloseModal}>cancel</button>
    </div>
  );

  /**
   * It returns the inputs for adding start time and endtime of a question
   * @param {Function} handleInputChange
   *
   * @returns {JSX}
   */
  renderTimeInputs = () => (
    <div className="inputs-inline">
      <div className="inputs">
        <label htmlFor="startTime" className="inputs-title">
          <span>Start</span>
        </label>
        <input
          type="time"
          name="startTime"
          onChange={this.handleInputChange}
          id="timeField"
          value={this.state.startTime}
        />
      </div>
      <div className="inputs">
        <label htmlFor="endTime" className="inputs-title">
          <span>End</span>
        </label>
        <input
          type="time"
          name="endTime"
          onChange={this.handleInputChange}
          id="timeField"
          value={this.state.endTime}
        />
      </div>
    </div>
  );

  /**
   * It returns the input text box for typing the question
   *
   * @returns {JSX}
   */
  renderQuestionInputBox = () => (
    <div className="inputs">
      <input
        placeholder="Enter Question here..."
        type="text"
        name="question"
        onChange={this.handleInputChange}
      />
    </div>
  );

  /**
   * It shows all the input fields required for creating a question
   *
   * @returns {JSX}
   */
  renderQuestionValues = () => (
    <div>
      <span className="question-form__sections">Date</span>
      <div>
        <Button
          icon={this.calendarIcon()}
          id="calendar-btn"
          onClick={this.calenderToggle}
        />
        {this.state.calenderOpen && (
          <Calendar
            sendDateData={this.sendDateData}
            handleCloseModal={this.calenderToggle}
          />
        )}
      </div>
      <span className="question-form__sections">Time</span>
      {this.renderTimeInputs()}
      <span className="question-form__sections">Question</span>
      {this.renderQuestionInputBox()}
      <div>
        <span className="question-form__sections">Question Type</span>
        <Select
          labelText=""
          name="questionType"
          id="selectType"
          value={this.state.questionType}
          onChange={this.handleInputChange}
          wrapperClassName="input-wrapper"
          placeholder="Select Type"
          options={this.state.options}
        />
      </div>
      {this.renderActionButtons()}
    </div>
  );

  render() {
    return (
      <MrmModal
        title="ADD QUESTION"
        buttonText="Add Question"
        closeModal={this.state.closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-question-modal"
      >
        <form className="question-form">{this.renderQuestionValues()}</form>
      </MrmModal>
    );
  }
}

export default AddQuestion;
