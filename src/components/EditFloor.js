import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { graphql } from 'react-apollo';
import MrmModal from '../components/commons/Modal';
import ActionButtons from './commons/ActionButtons';
import { Input } from '../components/commons';
// import '../assets/styles/editoffice.scss';
import notification from '../utils/notification';
import { EDIT_FLOOR_MUTATION } from '../graphql/mutations/Floors';

export class EditFloor extends React.Component {
  state = {
    floorName: this.props.floorName,
    floorId: this.props.floorId,
    closeModal: false,
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleEditFloor = (event) => {
    event.preventDefault();
    const { floorId, floorName } = this.state;

    this.props
      .editFloor({
        variables: {
          floorId,
          name: floorName,
        },
      })
      .then(() => {
        notification(
          toastr,
          'success',
          `${floorName} Floor has been updated successfully`,
        )();
      })
      .catch((err) => {
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
    this.handleCloseModal();
  };

  render() {
    const { floorName, closeModal } = this.state;

    return (
      <MrmModal
        title="EDIT FLOOR"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="edit-office-modal"
        modalButtonClassName="edit-button"
      >
        <form className="modal-form" onSubmit={this.handleEditFloor}>
          <Input
            labelName="Floor Name"
            labelClass="label1"
            inputClass="input1"
            name="floorName"
            value={floorName}
            id="floorName"
            onChange={this.handleInputChange}
            required
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

EditFloor.propTypes = {
  editFloor: PropTypes.func.isRequired,
  floorName: PropTypes.string.isRequired,
  floorId: PropTypes.string.isRequired,
};

export default graphql(EDIT_FLOOR_MUTATION, {
  name: 'editFloor',
})(EditFloor);