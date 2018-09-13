import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';

import MrmModal from '../components/commons/Modal';
import DELETE_ROOM from '../graphql/mutations/Rooms';
import { GET_ROOMS_QUERY } from '../graphql/queries/Rooms';
import notification from '../utils/notification';
import '../assets/styles/deleteModal.scss';


export class DeleteRoom extends Component {
  state = {
    closeModal: false,
  }

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  }

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  }

  handleDeleteRoom = (event) => {
    event.preventDefault();
    const variables = { variables: { roomId: this.props.roomId } };
    this.props
      .deleteRoom(variables)
      .then(() => {
        notification(
          toastr, 'error',
          `'${this.props.roomName}' has been deleted successfully`,
        )();
      })
      .catch(err => notification(toastr, 'error', err)());
    this.handleCloseModal();
  }

  render() {
    const {
      closeModal,
    } = this.state;

    return (
      <MrmModal
        className="delete-modal"
        title="DELETE ROOM"
        buttonText="Delete"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
      >
        <div className="delete-modal-content">
          <p id="confirm-msg">
            Are you sure you want to delete {`"${this.props.roomName}"`}? <br />
            This cannot be undone
          </p>
          <div className="modal-actions" >
            <button id="cancel-btn" onClick={this.handleCloseModal}>CANCEL</button>
            <button id="delete-btn" onClick={this.handleDeleteRoom}>DELETE</button>
          </div>
        </div>
      </MrmModal>
    );
  }
}

DeleteRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  deleteRoom: PropTypes.func.isRequired,
};

export default compose(graphql(DELETE_ROOM, {
  name: 'deleteRoom', options: { refetchQueries: [{ query: GET_ROOMS_QUERY }] },
}))(DeleteRoom);

