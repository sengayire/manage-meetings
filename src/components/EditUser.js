import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './commons/Input';
import Select from './commons/SelectInput';
import MrmModal from './commons/Modal';
import ActionButtons from './commons/ActionButtons';
// import EditButton from '../assets/images/edit.svg';
import '../assets/styles/editUser.scss';

class EditUser extends React.Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    userLocation: PropTypes.string.isRequired,
    accessLevel: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      userLocation: props.userLocation,
      accessLevel: props.accessLevel,
      closeModal: false,
    };
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleEditUser = (event) => {
    event.preventDefault();
    // submit logic here
    // after succesful submission close the modal
    this.handleCloseModal();
  }

  render() {
    const {
      userName, userLocation, accessLevel, closeModal,
    } = this.state;

    return (
      <MrmModal
        title="EDIT USER"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-user-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form" onSubmit={this.handleEditUser}>
          <Input
            labelName="Name"
            name="userName"
            value={userName}
            id="userName"
            onChange={this.handleInputChange}
            disabled
          />
          <Select
            labelText="Location"
            name="userLocation"
            id="userLocation"
            value={userLocation}
            onChange={this.handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Nairobi"
          />
          <Select
            labelText="Access Level"
            name="accessLevel"
            id="accessLevel"
            value={accessLevel}
            onChange={this.handleInputChange}
            wrapperClassName="input-wrapper"
            placeholder="Administrator"
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="SAVE CHANGES"
          />
        </form>
      </MrmModal>
    );
  }
}

export default EditUser;
