import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import ActionButtons from './commons/ActionButtons';
import MrmModal from '../components/commons/Modal';
import { DELETE_ROOM } from '../graphql/mutations/Rooms';
import { GET_ROOMS_QUERY } from '../graphql/queries/Rooms';
import notification from '../utils/notification';
import '../assets/styles/deleteModal.scss';

/**
 * Delete Room Component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class DeleteRoom extends Component {
  state = {
    closeModal: false,
    isDeleting: false,
  };

  /**
   * It closes a modal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  /**
   * Handles the state changes for the deleting room modal
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Handles deleting room
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleDeleteRoom = (event) => {
    event.preventDefault();
    this.toggleLoading();
    const variables = { variables: { roomId: this.props.roomId } };
    const { refetch, currentPage } = this.props;
    this.props
      .deleteRoom(variables)
      .then(() => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(
          toastr,
          'error',
          `'${this.props.roomName}' has been deleted successfully`,
        )();
        refetch({ page: currentPage });
      })
      .catch((err) => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(toastr, 'error', err.graphQLErrors[0].message)();
      });
  };

  /**
   * 1. change isLoading state to it's opposite value
   * i.e true to false or vise verser
   *
   * @returns {void}
   */
  toggleLoading = () => {
    this.setState({
      isDeleting: !this.state.isDeleting,
    });
  }

  render() {
    const { closeModal, isDeleting } = this.state;

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
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            isLoading={isDeleting}
            actionButtonText="DELETE ROOM"
            onClickSubmit={this.handleDeleteRoom}
          />
        </div>
      </MrmModal>
    );
  }
}

DeleteRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  currentPage: PropTypes.number,
};

DeleteRoom.defaultProps = {
  currentPage: 1,
  refetch: null,
};

export default compose(
  graphql(DELETE_ROOM, {
    name: 'deleteRoom',
    options: { refetchQueries: [{ query: GET_ROOMS_QUERY }] },
  }),
)(DeleteRoom);
