import React, { Component } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Modal from '../commons/Modal';
import notification from '../../utils/notification';
import RoomFormInput from './RoomForm';


import { GET_LOCATIONS_QUERY, GET_ROOMS_QUERY } from '../../graphql/queries/Rooms';
import { EDIT_ROOM_DETAILS_MUTATION } from '../../graphql/mutations/Rooms';

export class EditRoom extends Component {
  static propTypes = {
    roomName: PropTypes.string.isRequired,
    editRoom: PropTypes.func,
    roomId: PropTypes.string.isRequired,
    roomLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    locations: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })),
      PropTypes.object,
    ]).isRequired,
  };

  static defaultProps = {
    editRoom: PropTypes.func,
  }

  state = {
    closeModal: false,
    roomId: this.props.roomId,
    roomName: this.props.roomName,
  };

  handleCloseModal = () => {
    this.setState({ closeModal: true });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleEditRoom = () => {
    const { roomId, roomName } = this.state;

    this.props.editRoom({
      variables: {
        roomId,
        name: roomName,
      },
      refetchQueries: [{ query: GET_ROOMS_QUERY }],
    }).then(() => {
      notification(toastr, 'success', `Room name editted successfully to ${roomName}`)();
    }).catch((err) => {
      notification(toastr, 'error', err.graphQLErrors[0].message)();
    });
    this.handleCloseModal();
  };


  render() {
    const { closeModal } = this.state;
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
      },
    }),
  }),
  graphql(EDIT_ROOM_DETAILS_MUTATION, { name: 'editRoom' }),
)(EditRoom);
