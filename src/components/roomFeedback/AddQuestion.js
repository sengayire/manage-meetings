/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import notification from '../../utils/notification';
import Calendar from '../commons/Calendar';
import MrmModal from '../commons/MrmModal';
import { SelectInput as Select } from '../commons';
import '../../assets/styles/addQuestion.scss';
import { ADD_ROOM_FEEDBACK_QUESTIONS } from '../../graphql/mutations/Question';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../../src/graphql/queries/questions';


/**
 * Add Question Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class AddQuestion extends Component {
  state = {
    question: '',
    questionTitle: '',
    questionType: 0,
    startDate: moment().format('MMM DD Y'),
    endDate: moment().format('MMM DD Y'),
    startTime: moment().format('HH:MM'),
    endTime: moment()
      .add(1, 'hours')
      .format('HH:MM'),
    calendarOpen: false,
    closeModal: false,
    isLoading: false,
    error: {},
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
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  /**
   * It toggles the visibility of the modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * It toggles the visibility of the calendar modal
   *
   * @returns {void}
   */
  calenderToggle = () => {
    const { calendarOpen } = this.state;
    this.setState({ calendarOpen: !calendarOpen });
  };

  /**
   * It updates the state with the selected start and end date
   *
   * @returns {void}
   */
  sendDateData = (start, end) => {
    this.setState({ startDate: start, endDate: end });
    this.calenderToggle();
  };

  /**
   * It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

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
   * This function formats the returned date
   * and time to form a datetime object for
   * both start date and end date
   *
   * @param {date} theDate
   * @param {time} theTime
   *
   * @returns {string}
   */
  formatDateTime = (theDate, theTime) => {
    const theDateValue = (`0${new Date(theDate).getDate()}`).slice(-2);
    const theMonth = (`0${parseInt(new Date(theDate).getMonth() + 1, 10)}`).slice(-2);
    const theYear = new Date(theDate).getFullYear();
    const finalDate = `${theYear}-${theMonth}-${theDateValue}T${theTime}:00`;
    return finalDate;
  };

  /**
   * handles creation of a question
   *
   * @returns {void}
   */
  createQuestion = () => {
    const {
      question, questionTitle, questionType, startDate, endDate, startTime, endTime, options,
    } = this.state;
    const valueOfQuestionType = parseInt(questionType, 10) - 1;
    const questionTypeName = options[valueOfQuestionType].name;
    this.toggleLoading();
    this.props.addQuestion({
      variables: {
        question,
        questionTitle,
        questionType: questionTypeName,
        startDate: this.formatDateTime(startDate, startTime),
        endDate: this.formatDateTime(endDate, endTime),
      },
    })
      .then(() => {
        notification(
          toastr,
          'success',
          'Question has been added successfully',
        )();
        this.setState({
          question: '',
          questionTitle: '',
          questionType: 0,
          startDate: moment().format('MMM DD Y'),
          endDate: moment().format('MMM DD Y'),
          startTime: moment().format('HH:MM'),
          endTime: moment().format('HH:MM'),
        });
        this.handleCloseModal();
        this.toggleLoading();
      })
      .catch((err) => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  }

  /**
   * compares the start date with today's date
   * compares the end date with today's date
   * compares the start date with end date
   *
   * @param {date} start
   * @param {date} end
   *
   * @returns {string}
   */
  compareDates = (start, end) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return this.inputErrors('date', 'Start date cannot be past days');
    } else if (end < today) {
      return this.inputErrors('date', 'End date should be at least a day after today');
    } else if (end <= start) {
      return this.inputErrors('date', 'End date should be at least a day after start date');
    }
    return this.createQuestion();
  }

  /**
   * validates question input before creating a question
   *
   * @param {Object} event
   *
   * @returns {void}
   */
  validateInputFields = () => {
    const {
      question, questionTitle, questionType, startDate, endDate,
    } = this.state;
    if (!questionTitle) {
      return this.inputErrors('questionTitle', 'Please provide the title of the question');
    } else if (!question) {
      return this.inputErrors('question', 'Please provide the feedback question');
    } else if (questionType === 0) {
      return this.inputErrors('type', 'Please select the question type');
    }
    return this.compareDates(new Date(startDate), new Date(endDate));
  }

  /**
   * renders the validation errors for input fields
   *
   * @param {string} errorKey
   * @param {string} message
   *
   * @returns {void}
   */
  inputErrors = (errorKey, message) => {
    this.setState({
      ...this.state.error[errorKey] = message,
    });
  }

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
   * It returns the input text box for typing the question title
   *
   * @returns {JSX}
   */
  renderQuestionTitleInputBox = () => (
    <div>
      {this.state.error.questionTitle &&
      <span className="span-error">
        <br />{this.state.error.questionTitle}
      </span>}
      <div className={this.state.error.questionTitle ? 'input-error' : 'inputs'}>
        <input
          placeholder="Enter Question Title Here..."
          type="text"
          name="questionTitle"
          onChange={this.handleInputChange}
          value={this.state.questionTitle}
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
    <div>
      {this.state.error.question &&
        <span className="span-error">
          <br />{this.state.error.question}
        </span>}
      <div className={this.state.error.question ? 'input-error' : 'inputs'}>
        <input
          placeholder="Enter Question here..."
          type="text"
          name="question"
          onChange={this.handleInputChange}
          value={this.state.question}
        />
      </div>
    </div>
  );

  /**
   * It renders the calendar component
   *
   * @returns {JSX}
   */
  renderCalendarComponent = () => (
    <div>
      {this.state.error.date &&
        <span className="span-error">
          <br />{this.state.error.date}
        </span>}
      <Calendar
        sendData={this.sendDateData}
        classProp={this.state.error.date ? 'calendarIconBtn-error' : 'calendarIconBtn'}
      />
    </div>
  );


  /**
   * It renders the dropdown for
   * selecting question type
   *
   * @returns {JSX}
   */
  rendersQuestionType = () => (
    <div>
      {this.state.error.type &&
      <span className="span-error">
        <br />{this.state.error.type}
      </span>}
      <Select
        labelText=""
        name="questionType"
        id={this.state.error.type ? 'selectType-error' : 'selectType'}
        value={this.state.questionType}
        onChange={this.handleInputChange}
        wrapperClassName="input-wrapper"
        placeholder="Select Type"
        options={this.state.options}
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
      {this.renderCalendarComponent()}
      <span className="question-form__sections">Time</span>
      {this.renderTimeInputs()}
      <span className="question-form__sections">Question Title</span>
      {this.renderQuestionTitleInputBox()}
      <span className="question-form__sections">Question</span>
      {this.renderQuestionInputBox()}
      <span className="question-form__sections">Question Type</span>
      {this.rendersQuestionType()}
    </div>
  );

  render() {
    return (
      <MrmModal
        title="ADD QUESTION"
        buttonText="Add Question"
        modalButtonClassName="add-question-button"
        modalContent={this.renderQuestionValues()}
        cancelButtonText="CANCEL"
        actionButtonText="ADD QUESTION"
        handleSubmit={this.validateInputFields}
        isLoading={this.state.isLoading}
      />

    );
  }
}
AddQuestion.defaultProps = {
  addQuestion: null,
};
AddQuestion.propTypes = {
  addQuestion: PropTypes.func,
};
export default graphql(ADD_ROOM_FEEDBACK_QUESTIONS,
  {
    name: 'addQuestion',
    options:
  { refetchQueries: [{ query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY }] },
  })(AddQuestion);
