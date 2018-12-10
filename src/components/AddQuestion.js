/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import MrmModal from '../components/commons/Modal';
import '../assets/styles/addQuestion.scss';

class AddQuestion extends Component {
  state = {
    closeModal: false,
    defaultQuestionSet: {
      Schedule: [
        {
          title: 'from',
          description: 'Dec 3rd 2018',
        },
        {
          title: 'to',
          description: 'Dec 3rd 2018',
        },
      ],
      Question: [
        {
          title: 'rate',
          description: 'How would you rate the cleanliness of the meeting room',
        },
        {
          title: 'check',
          description: 'Is there any missing meeting room tool',
        },
        {
          title: 'suggestion',
          description: 'Any suggestion on how we can improve the service',
        },
      ],
    },
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
   * It renders the input boxes
   *
   * @param {string} title
   * @param {string} placeholder
   * @param {string} id
   * @param {number} index
   * @param {Function} onChange
   * @param {string} value
   *
   * @returns {JSX}
   */
  renderInputBox = (
    title,
    placeholder,
    id,
    index,
    onChange = this.handleInputChange,
    value = this.state[id],
  ) => (
    <div className="inputs" key={index}>
      <label htmlFor={id} className="inputs-title">
        <span>
          {title}
        </span>
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );

  /**
   * It shows renders the default questions
   *
   * @param {Object} defaultQuestionSet
   *
   * @returns {JSX}
   */
  renderDefaultQuestions = ({ defaultQuestionSet } = this.state) => (
    <React.Fragment>
      {
        Object.keys(defaultQuestionSet).map((data, index) => (
          <div key={index}>
            <span className="question-form__sections">
              {data}
            </span>
            <div className={data === 'Schedule' ? 'inputs-inline' : ''}>
              {
                defaultQuestionSet[data].map(({ title, description }, childIndex) => (
                  this.renderInputBox(title, description, 'startDate', childIndex)
                ))
              }
            </div>
          </div>
        ))
      }
      <span className="question-form__add">Add Questions</span>
      <div className="button-container">
        <button onClick={this.handleCloseModal}>save question</button>
        <button onClick={this.handleCloseModal}>cancel</button>
      </div>
    </React.Fragment>
  );

  render() {
    return (
      <MrmModal
        title="ADD QUESTION"
        buttonText="Add Question"
        closeModal={this.state.closeModal}
        handleCloseRequest={this.handleCloseModal}
        className="add-question-modal"
      >
        <form className="question-form">
          {this.renderDefaultQuestions()}
        </form>
      </MrmModal>
    );
  }
}

export default AddQuestion;
