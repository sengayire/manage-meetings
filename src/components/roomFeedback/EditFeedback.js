import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import toastr from 'toastr';
import moment from 'moment';
import notification from '../../utils/notification';
import Select from '../commons/SelectInput';
import Calendar from '../commons/Calendar';
import MrmModal from '../commons/Modal';
import ActionButtons from '../commons/ActionButtons';
import { UPDATE_QUESTION_MUTATION } from '../../graphql/mutations/Question';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../../src/graphql/queries/questions';
import '../../assets/styles/editfeedback.scss';

/**
 * Edit Feedback Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class EditFeedback extends Component {
  /**
   * Get the time from a given date
   * @param {string} date - Date string we want to get the time from
   * @returns {string} - A string describing the time in hour and minutes format (HH:MM)
   */
  static getTime = (date) => {
    const dateInstance = new Date(date);
    const getHours = (`0${dateInstance.getHours()}`).slice(-2);
    const getMinutes = (`0${dateInstance.getMinutes()}`).slice(-2);
    return `${getHours}:${getMinutes}`;
  };

  /**
   * This method formats a given date in the form "MAR 13 2019" to "2019-03-19"
   *
   * @param {string} date - The date we want to format
   *
   * @returns {string} - Formated date
   */
  getDate = (date) => {
    const dateValue = (`0${new Date(date).getDate()}`).slice(-2);
    const theMonth = (`0${parseInt(new Date(date).getMonth() + 1, 10)}`).slice(-2);
    const theYear = new Date(date).getFullYear();
    return `${theYear}-${theMonth}-${dateValue}`;
  }

  initialState = () => ({
    ...this.initialModalState(),
    questionId: this.props.questionId,
    closeModal: false,
    isLoading: false,
    calendarOpen: false,
    showEditQuestionButton: false,
    error: {},
    options: [
      {
        id: '1',
        name: 'rate',
      },
      {
        id: '2',
        name: 'check',
      },
      {
        id: '3',
        name: 'suggest',
      },
    ],
  });

  initialModalState = () => ({
    question: this.props.question,
    questionType: this.props.questionType,
    questionTitle: this.props.questionTitle,
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    endTime: EditFeedback.getTime(this.props.endDate),
    startTime: EditFeedback.getTime(this.props.startDate),
  });

  state = { ...this.initialState() }; // eslint-disable-line react/sort-comp

  /**
   * It closes a modal
   *
   * @returns {void}
   */
  handleCloseModal = () => this.setState({ ...this.initialState, closeModal: true, error: {} });

  /**
   * It changes the state of the modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => this.state.closeModal && this.setState({ closeModal: false });

  /**
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

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
    this.setState({ startDate: start, endDate: end }, () => this.handleShowEditQuestionButton());
    this.calenderToggle();
  };

  /**
   * Gets the current values of the edit-modal from state.
   * These values are then used to check if the user actually updated the question
   *
   * @returns {void}
   */
  updatedModalState = () => ({
    question: this.state.question,
    questionType: this.state.questionType,
    questionTitle: this.state.questionTitle,
    startDate: `${this.getDate(this.state.startDate)} ${this.state.startTime}:00`,
    endDate: `${this.getDate(this.state.endDate)} ${this.state.endTime}:00`,
    endTime: this.state.endTime,
    startTime: this.state.startTime,
  });

  /**
   * Displays the "Edit Question" button based on if the user actually edits the modal
   *
   * @param {string} name - property of the sate and initial object whose value we want to compare
   *
   * @returns {void}
   */
  handleShowEditQuestionButton = () => {
    if (JSON.stringify(this.initialModalState()) === JSON.stringify(this.updatedModalState())) {
      this.setState({ showEditQuestionButton: false });
    } else {
      this.setState({ showEditQuestionButton: true });
    }
  };

  /**
   * Ensures that the state is updated basing on the changes in the input fields
   *
   * @param {Object} target
   *
   * @returns {void}
   */
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleShowEditQuestionButton());
  };

  /**
   * This function formats a date and time parameter
   * to form a date-time standard format.
   * e.g. from "MAR 13 2019" & "11:24" to "2019-03-19T11:24:00"
   *
   * @param {date} theDate
   * @param {time} theTime
   * @returns {string}
   *
   */
  formatDateTime = (date, time) => (`${this.getDate(date)}T${time}:00`);

  /**
   * handles editing a feedback question
   *
   * @returns {void}
   */
  editQuestion = () => {
    const {
      question, questionTitle, questionType, startDate, startTime,
      endDate, endTime, questionId,
    } = this.state;
    this.toggleLoading();
    this.props.editFeedbackQuestion({
      variables: {
        questionId,
        question,
        questionTitle,
        questionType,
        startDate: this.formatDateTime(startDate, startTime),
        endDate: this.formatDateTime(endDate, endTime),
      },
    }).then(() => {
      notification(
        toastr,
        'success',
        'Question has been updated successfully',
      )();
      this.toggleLoading();
      this.handleCloseModal();
    })
      .catch((err) => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  };

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
      return this.inputErrors('date', 'Start date cannot be in the past');
    }
    if (end < today) {
      return this.inputErrors('date', 'End date should be at least a day after today');
    }
    if (end <= start) {
      return this.inputErrors('date', 'End date should be at least a day after the start date');
    }
    return this.editQuestion();
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
      question, questionTitle, questionType, startDate, endDate, options,
    } = this.state;
    const questionTypedFound = options
      .find(option => option.name.toLowerCase() === questionType.toLowerCase());
    if (!questionTitle) {
      return this.inputErrors('questionTitle', 'Please provide the title of the question');
    }
    if (!question) {
      return this.inputErrors('question', 'Please provide the feedback question');
    }
    if ((questionType === 0) || (questionTypedFound === undefined)) {
      return this.inputErrors('questionType', 'Please select a question type');
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
  inputErrors = (errorKey, message) => this.setState({ error: { [errorKey]: message } });

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
        startDate={moment(this.getDate(this.state.startDate)).format('MMM DD YYYY')}
        endDate={moment(this.getDate(this.state.endDate)).format('MMM DD YYYY')}
      />
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
          type="text"
          name="question"
          onChange={this.handleInputChange}
          value={this.state.question}
        />
      </div>
    </div>
  );

  /**
   * It renders the dropdown for
   * selecting question type
   *
   * @returns {JSX}
   */
  rendersQuestionType = () => {
    const { questionType, options, error } = this.state;
    return (
      <div>
        {error.questionType &&
        <span className="span-error">
          <br />{error.questionType}
        </span>}
        <Select
          labelText=""
          isValue
          name="questionType"
          id={error.questionType ? 'selectType-error' : 'selectType'}
          placeholder={questionType}
          placeholderValue={questionType}
          onChange={this.handleInputChange}
          wrapperClassName="input-wrapper"
          options={options}
        />
      </div>
    );
  }

  /**
   * It renders the action buttons
   * for cancel and submit
   *
   * @returns {JSX}
   */
  renderActionButtons = () => (
    <div>
      <ActionButtons
        withCancel
        onClickCancel={this.handleCloseModal}
        isLoading={this.state.isLoading}
        actionButtonText="EDIT QUESTION"
        onClickSubmit={this.validateInputFields}
        showActionButton={this.state.showEditQuestionButton}
      />
    </div>
  );

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
    const { closeModal } = this.state;
    return (
      <MrmModal
        title="EDIT QUESTION"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-question-modal"
        modalButtonClassName="edit-button"
      >
        {this.renderQuestionValues()}
      </MrmModal>
    );
  }
}

EditFeedback.propTypes = {
  question: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
  questionTitle: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  editFeedbackQuestion: PropTypes.func.isRequired,
};

export default graphql(UPDATE_QUESTION_MUTATION, {
  name: 'editFeedbackQuestion',
  options: {
    refetchQueries: [{ query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY }],
  },
})(EditFeedback);
