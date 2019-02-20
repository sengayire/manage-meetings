/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import moment from 'moment';
import ActionButtons from '../commons/ActionButtons';
import Calendar from '../commons/Calendar';
import MrmModal from '../commons/Modal';
import { SelectInput as Select } from '../commons';
import '../../assets/styles/addQuestion.scss';

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
    startTime: moment().format('HH:MM'),
    endTime: moment()
      .add(1, 'hours')
      .format('HH:MM'),
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
    this.setState({ closeModal: !this.state.closeModal });
  };

  /**
   * It updates the state with the selected start and end date
   *
   * @returns {void}
   */
  sendDateData = () => {
    this.setState({});
  };

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
    <div className="question-form">
      <span className="question-form__sections">Date</span>
      <Calendar
        sendData={this.sendDateData}
      />
      <span className="question-form__sections">Time</span>
      {this.renderTimeInputs()}
      <span className="question-form__sections">Question</span>
      {this.renderQuestionInputBox()}
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
      <ActionButtons
        onClickCancel={this.handleCloseModal}
        onClickSubmit={this.handleCloseModal}
      />
    </div>
  );

  render() {
    return (
      <MrmModal
        title="ADD QUESTION"
        buttonText="Add Question"
        closeModal={this.state.closeModal}
        className="add-question-modal"
      >
        {this.renderQuestionValues()}
      </MrmModal>
    );
  }
}

export default AddQuestion;
