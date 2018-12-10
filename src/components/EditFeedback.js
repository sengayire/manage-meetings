import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './commons/Input';
import Select from './commons/SelectInput';
import MrmModal from './commons/Modal';
import ActionButtons from './commons/ActionButtons';
import '../assets/styles/editfeedback.scss';

class EditFeedback extends Component {
  state = {
    question: this.props.question,
    type: this.props.type,
    startDate: this.props.startDate,
    duration: this.props.duration,
    closeModal: false,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleEditFeedback = (event) => {
    event.preventDefault();
    /** submit logic here */
    this.handleCloseModal();
  }

  render() {
    const {
      question, type, startDate, duration, closeModal,
    } = this.state;

    return (
      <MrmModal
        title="Edit Question"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-feedback-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form" onSubmit={this.handleEditFeedback}>
          <Input
            labelName="Question"
            labelClass="label1"
            inputClass="input1"
            name="question"
            id="question"
            value={question}
            onChange={this.handleInputChange}
          />
          <Select
            labelText="Type"
            name="type"
            id="type"
            value={type}
            onChange={this.handleInputChange}
            options={[]}
            wrapperClassName="label1"
            placeholder="Rate"
            selectInputClassName="edit-feedback-select"
          />
          <Input
            labelName="Start Date"
            labelClass="label1"
            inputClass="input1"
            name="startDate"
            id="startDate"
            value={startDate}
            placeholder="03 Nov 2018"
            onChange={this.handleInputChange}
          />
          <Input
            labelName="Duration"
            labelClass="label1"
            inputClass="input1"
            name="duration"
            id="duration"
            value={duration}
            placeholder="3 Weeks"
            onChange={this.handleInputChange}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="Save Changes"
          />
        </form>
      </MrmModal>
    );
  }
}

EditFeedback.propTypes = {
  question: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default EditFeedback;

