import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import ActionButtons from '../commons/ActionButtons';
import MrmModal from '../commons/Modal';
import { DELETE_ROOM } from '../../graphql/mutations/Rooms';
import { GET_ROOMS_QUERY } from '../../graphql/queries/Rooms';
import notification from '../../utils/notification';
import '../../assets/styles/deleteModal.scss';

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
   * it makes a graphQL mutation to delete a room
   *
   * @returns {void}
   */
  handleDeleteRoom = () => {
    this.toggleLoading();
    const {
      deleteRoom, roomId, refetch, currentPage,
    } = this.props;
    deleteRoom(
      {
        variables: { roomId },
        refetchQueries: [{
          query: GET_ROOMS_QUERY,
          variables: {
            page: 1,
            perPage: 5,
            capacity: 0,
            location: '',
            office: '',
            roomLabels: '',
          },
        }],
      })
      .then(() => {
        this.toggleLoading();
        this.handleCloseModal();
        notification(
          toastr,
          'success',
          `'${this.props.roomName}' has been deleted successfully`,
        )();
        this.props.clearFilter();
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
  clearFilter: PropTypes.func.isRequired,
};

DeleteRoom.defaultProps = {
  refetch: null,
  currentPage: 1,
};

export default compose(
  graphql(DELETE_ROOM, { name: 'deleteRoom' }),
)(DeleteRoom);
