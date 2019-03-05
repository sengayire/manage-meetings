import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import NairobiRoomInputs from './NairobiRoomInputs';
import '../../assets/styles/addRoomNairobi.scss';
import SelectImage from '../commons/SelectImage';
import ADD_ROOM_TO_THE_DOJO from '../../graphql/mutations/rooms/AddRoomToDojo';
import { GET_NAIROBI_DETAILS } from '../../graphql/queries/Offices';
import { GET_ALL_REMOTE_ROOMS } from '../../graphql/queries/Rooms';
import notification from '../../utils/notification';
import getImageUrl from '../helpers/ImageUpload';
import hasInvalidInputs from '../helpers/InputValidators';

export class AddRoomNairobi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      remoteRoomName: '',
      roomType: 'meeting',
      roomCalendar: '',
      officeId: 0,
      roomCapacity: 0,
      officeBlock: '',
      blockOptions: [],
      officeFloor: '',
      floorObject: {},
      allRemoteRooms: [],
      floorOptions: [],
      uploading: false,
      thumbnailName: 'Upload a thumbnail',
      closeModal: false,
      imageUrl: '',
      isLoading: false,
      files: [],
    };
  }

  componentWillReceiveProps = (props) => {
    const { officeDetails } = props;
    const { remoteRooms } = props;
    /* istanbul ignore next */
    if (officeDetails.getOfficeByName) {
      const {
        getOfficeByName: [
          {
            id,
            blocks,
          },
        ],
      } = officeDetails;

      const blockOptions = [];
      const floorObject = { 0: [] };
      const officeId = parseInt(id, 10);

      blocks.forEach((block) => {
        blockOptions.push({
          id: parseInt(block.id, 10),
          name: block.name,
        });
        floorObject[parseInt(block.id, 10)] =
          block.floors.map(floor => ({ id: parseInt(floor.id, 10), name: floor.name }));
      });
      this.setState({
        blockOptions,
        floorObject,
        officeId,
      });
    }
    /* istanbul ignore next */
    if (remoteRooms.allRemoteRooms) {
      const { rooms: [{ calendarId, name }] } = remoteRooms.allRemoteRooms;
      const { rooms } = remoteRooms.allRemoteRooms;
      this.setState({
        allRemoteRooms: rooms,
        remoteRoomName: name,
        roomCalendar: calendarId,
      });
    }
  };

  /**
   * It handles close modal
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState({
      roomName: '',
      roomCapacity: 0,
      officeBlock: '',
      officeFloor: '',
      closeModal: true,
      thumbnailName: 'Upload a thumbnail',
      imageUrl: '',
    });
  };

  /**
   * It ensures that the state is updated basing on the changes
   * in the input fields
   *
   * @param  {object} event
   * @param  {number} number
   */
  handleInputChange = (event, number) => {
    const { target: { name, value } } = event;
    let intValue;
    const { floorObject } = this.state;

    switch (name) {
      case 'roomName':
        this.setState({ [name]: value.trim() });
        break;
      case 'remoteRoomName':
        this.setState({ [name]: value.trim() });
        break;
      case 'roomCapacity':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      case 'officeBlock':
        intValue = parseInt(value, 10);
        this.setState({ [name]: intValue, officeFloor: '', floorOptions: [] }, () => {
          this.setState({ floorOptions: floorObject[intValue] });
        });
        break;
      case 'officeFloor':
        intValue = parseInt(value, 10);
        this.setState({ [name]: intValue });
        break;
      default:
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        if (number !== undefined) {
          intValue = number;
          this.setState({ roomCapacity: intValue });
        }
    }
  };

  /**
   *  It updates the state value of closeModal
   * to false whenever the modal closes
   *
   * @returns {void}
   */
  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  /**
   * Ensures that a room is added
   *
   * @param  {object} event
   * @returns {function}
   */
  handleAddRoom = (event) => {
    event.preventDefault();
    const {
      roomCalendar,
      roomCapacity,
      roomName,
      roomType,
      imageUrl,
      officeBlock,
      officeFloor,
      officeId,
      files,
    } = this.state;
    const { dojoMutation } = this.props;
    if (!hasInvalidInputs(this.state)) {
      this.toggleLoading();
      getImageUrl('upload/', files[0])
        .then((url) => {
          this.setState({
            imageUrl: url,
            uploading: false,
          }, () => {
            dojoMutation({
              variables: {
                roomType,
                roomName,
                roomCalendar,
                roomCapacity,
                officeBlock,
                roomFloorId: officeFloor,
                office_id: officeId,
                imageUrl,
              },
            }).then((res) => {
              this.toggleLoading();
              this.handleCloseModal();
              notification(toastr, 'success', `${res.data.createRoom.room.name} Successfully added`)();
            }).catch((err) => {
              this.toggleLoading();
              this.handleCloseModal();
              notification(toastr, 'error', err.message)();
            });
          });
        });
    }
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

  /**
   *It updates the state value of the
   * thumbnail, image and imageUrl
   *
   * @returns {void}
   */
  updateThumbnailState = (files, imageUrl, thumbnailName) => {
    this.setState({ files, imageUrl, thumbnailName });
  }

  render() {
    const {
      roomName,
      roomCapacity,
      blockOptions,
      officeFloor,
      officeBlock,
      floorOptions,
      closeModal,
      thumbnailName,
      imageUrl,
      isLoading,
      allRemoteRooms,
      remoteRoomName,
    } = this.state;
    let blockOptionsList = blockOptions;
    const { officeDetails } = this.props;

    if (officeDetails.loading) {
      blockOptionsList = [{ id: 0, name: 'Loading blocks' }];
    }

    return (
      <Modal
        title="ADD ROOM"
        buttonText="St Catherines"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="nbo-add-room-modal button addRoomBtn"
      >
        <form className="modal-form" onSubmit={this.handleAddRoom}>
          <SelectImage
            updateThumbnailState={this.updateThumbnailState}
            thumbnailName={thumbnailName}
            imageUrl={imageUrl}
          />
          <NairobiRoomInputs
            roomName={roomName}
            remoteRoomName={remoteRoomName}
            roomCapacity={roomCapacity}
            officeBlock={officeBlock}
            officeFloor={officeFloor}
            blockOptions={blockOptionsList}
            floorOptions={floorOptions}
            handleInputChange={this.handleInputChange}
            allRemoteRooms={allRemoteRooms}
          />
          <ActionButtons
            withCancel
            onClickCancel={this.handleCloseModal}
            actionButtonText="ADD ROOM"
            isLoading={isLoading}
            onClickSubmit={this.handleAddRoom}
          />
        </form>
      </Modal>
    );
  }
}

AddRoomNairobi.propTypes = {
  dojoMutation: PropTypes.func.isRequired,
  officeDetails: PropTypes.shape({
    getOfficeByName: PropTypes.array,
  }).isRequired,
  // eslint-disable-next-line
  remoteRooms: PropTypes.shape({
    allRemoteRooms: PropTypes.shape({
      rooms: PropTypes.array,
    }),
  }),
};

AddRoomNairobi.defaultProps = {
  remoteRooms: {
    allRemoteRooms: {
      rooms: [],
    },
  },
};

export default compose(
  graphql(GET_NAIROBI_DETAILS, { name: 'officeDetails' }),
  graphql(GET_ALL_REMOTE_ROOMS, { name: 'remoteRooms' }),
  graphql(ADD_ROOM_TO_THE_DOJO, { name: 'dojoMutation' }),
)(AddRoomNairobi);
