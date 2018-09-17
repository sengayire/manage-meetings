import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import NairobiRoomInputs from './NairobiRoomInputs';
import '../../assets/styles/addRoomNairobi.scss';
import SelectImage from '../commons/SelectImage';
import ADD_ROOM_ST_CATHERINE from '../../graphql/mutations/rooms/AddRoomStCatherine';
import { GET_NAIROBI_QUERY } from '../../graphql/queries/locations';
import { GET_ROOMS_QUERY } from '../../graphql/queries/Rooms';
import notification from '../../utils/notification';
import floor from '../../fixtures/nairobiFloors';
import { formatData } from '../../graphql/mappers/Rooms';
import getImageUrl from '../helpers/ImageUpload';
import getThumbnailName from '../helpers/thumbnailName';

export class AddRoomNairobi extends Component {
  state = {
    roomName: '',
    roomCapacity: 1,
    officeBlock: '',
    officeFloor: '',
    closeModal: false,
    floors: [],
    thumbnailName: 'Upload a thumbnail',
    imageUrl: '',
  };

  handleCloseModal = () => {
    this.setState({
      roomName: '',
      roomCapacity: 1,
      officeBlock: '',
      officeFloor: '',
      closeModal: true,
      floors: [],
      thumbnailName: 'Upload a thumbnail',
      imageUrl: '',
    });
  };

  handleInputChange = ({ target: { name, value, files } }) => {
    if (value === 'A') {
      this.setState({
        officeBlock: 2,
        floors: floor.blockA,
      });
    }
    if (value === 'B') {
      this.setState({
        officeBlock: 2,
        floors: floor.blockB,
      });
    }
    if (name === 'selectImage') {
      const folderName = 'upload/';
      const imageFile = files[0];
      const thumbnailName = getThumbnailName(files);

      this.setState({ thumbnailName }, () => {
        getImageUrl(folderName, imageFile)
          .then((imageUrl) => {
            if (typeof (imageUrl) === 'string') {
              this.setState({
                imageUrl,
              });
            }
          });
      });
    }
    this.setState({ [name]: value });
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddRoom = (event) => {
    event.preventDefault();

    const {
      roomName, roomCapacity, officeBlock, officeFloor, imageUrl,
    } = this.state;

    const payload = formatData(
      roomName,
      roomCapacity,
      officeBlock,
      officeFloor,
      imageUrl,
    );

    this.props.createRoom({
      variables: payload,
    }).then((res) => {
      const message = res.data.createRoom.room.name;
      notification(toastr, 'success', `'${message}' has been added successfully`)();
    }).catch((error) => {
      notification(toastr, 'error', `${error}`)();
    });
    this.handleCloseModal();
  };

  render() {
    const {
      roomName, roomCapacity, officeBlock, officeFloor, closeModal, floors,
      thumbnailName, imageUrl,
    } = this.state;

    return (
      <Modal
        title="ADD ROOM"
        buttonText="St. Catherines"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="nbo-add-room-modal button addRoomBtn"
      >
        <form className="modal-form" onSubmit={this.handleAddRoom}>
          <SelectImage
            onChange={this.handleInputChange}
            thumbnailName={thumbnailName}
            imageUrl={imageUrl}
          />
          <NairobiRoomInputs
            roomName={roomName}
            roomCapacity={roomCapacity}
            officeBlock={officeBlock}
            officeFloor={officeFloor}
            handleInputChange={this.handleInputChange}
            floors={floors}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD ROOM"
          />
        </form>
      </Modal>
    );
  }
}

AddRoomNairobi.propTypes = {
  createRoom: PropTypes.func.isRequired,
};

export default compose(
  graphql(ADD_ROOM_ST_CATHERINE, { name: 'createRoom', options: { refetchQueries: [{ query: GET_ROOMS_QUERY }] } }),
  graphql(GET_NAIROBI_QUERY, { name: 'officeName' }),
)(AddRoomNairobi);
