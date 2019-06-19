import React, { Component } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Modal from '../commons/Modal';
import notification from '../../utils/notification';
import RoomFormInput from './RoomForm';

import {
  GET_LOCATIONS_QUERY,
  GET_ROOMS_QUERY,
} from '../../graphql/queries/Rooms';
import { EDIT_ROOM_DETAILS_MUTATION } from '../../graphql/mutations/Rooms';

export class EditRoom extends Component {
  static propTypes = {
    roomName: PropTypes.string.isRequired,
    editRoom: PropTypes.func,
    roomId: PropTypes.string.isRequired,
    roomLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    locations: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string,
        }),
      ),
      PropTypes.object,
    ]).isRequired,
    refetch: PropTypes.func,
    currentPage: PropTypes.number,
  };

  static defaultProps = {
    editRoom: /* istanbul ignore next */ () => { },
    refetch: null,
    currentPage: null,
  };

  state = {
    closeModal: false,
    roomId: this.props.roomId,
    roomName: this.props.roomName,
    isLoading: false,
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
   * HIt updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Ensures that the state is updated basing
   * on the changes in the input fields
   *
   * @param {Object} target
   *
   * @returns {void}
   */
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  /**
   * Edits a room
   *
   * @returns {void}
   */
  handleEditRoom = () => {
    this.toggleLoading();
    const { roomId, roomName } = this.state;
    const { currentPage, refetch } = this.props;

    this.props.editRoom({
      variables: {
        roomId,
        name: roomName,
      },
    }).then(() => {
      this.toggleLoading();
      this.handleCloseModal();
      notification(toastr, 'success', `Room name edited successfully to ${roomName}`)();
      refetch({ page: currentPage });
    }).catch((err) => {
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
      isLoading: !this.state.isLoading,
    });
  }

  render() {
    const { closeModal, isLoading } = this.state;
    const { roomLocation } = this.props;
    const { allLocations } = this.props.locations;

    return (
      <Modal
        title="EDIT ROOM"
        buttonText="Edit"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="modal"
      >
        <RoomFormInput
          isLoading={isLoading}
          onSubmit={this.handleEditRoom}
          onCloseModalRequest={this.handleCloseModal}
          roomLocation={roomLocation}
          formRole="edit"
          locations={allLocations || []}
          handleInputChange={this.handleInputChange}
          formDetails={this.state}
        />
      </Modal>
    );
  }
}

export default compose(
  graphql(GET_LOCATIONS_QUERY, { name: 'locations' }),
  graphql(GET_ROOMS_QUERY, {
    name: 'getRoomsQuery',
    options: () => ({
      variables: {
        page: 1,
        perPage: 5,
        capacity: 0,
        location: '',
        office: '',
      },
    }),
  }),
  graphql(EDIT_ROOM_DETAILS_MUTATION, { name: 'editRoom' }),
)(EditRoom);
