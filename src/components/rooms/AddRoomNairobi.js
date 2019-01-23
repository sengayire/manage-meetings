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
import notification from '../../utils/notification';
import getImageUrl from '../helpers/ImageUpload';
import hasInvalidInputs from '../helpers/InputValidators';
import getThumbnailName from '../helpers/thumbnailName';

export class AddRoomNairobi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      roomType: 'meeting',
      roomCalendar: 'andela.com_3137343432303133383637@resource.calendar.google.com',
      officeId: 0,
      roomCapacity: 0,
      officeBlock: '',
      blockOptions: [],
      officeFloor: '',
      floorObject: {},
      floorOptions: [],
      uploading: false,
      thumbnailName: 'Upload a thumbnail',
      closeModal: false,
      imageUrl: '',
    };
  }

  componentWillReceiveProps = (props) => {
    const { officeDetails } = props;
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
    const { target: { name, value, files } } = event;
    let thumbnailName;
    let intValue;
    let imageUrl;
    const { floorObject } = this.state;

    switch (name) {
      case 'selectImage':
        /* Shorten the length of the thumbnail name in case its too long */
        thumbnailName = getThumbnailName(files);
        this.setState({ thumbnailName, uploading: true }, () => {
          /** pass a folder name and the file object to the getImageUrl function
           *  and expect a url to be returned from firebase
           */
          getImageUrl('upload/', files[0]).then((url) => {
            imageUrl = url;
            if (typeof imageUrl === 'string') {
              this.setState({
                imageUrl,
                uploading: false,
              });
            }
          });
        });
        break;
      case 'roomName':
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
      roomCalendar, roomCapacity, roomName, roomType, imageUrl, officeBlock, officeFloor, officeId,
    } = this.state;
    if (!hasInvalidInputs(this.state)) {
      this.props.dojoMutation({
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
        this.handleCloseModal();
        notification(toastr, 'success', `${res.data.createRoom.room.name} Successfully added`)();
      }).catch((err) => {
        notification(toastr, 'error', err.message)();
      });
    }
  };

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
            onChange={this.handleInputChange}
            thumbnailName={thumbnailName}
            imageUrl={imageUrl}
          />
          <NairobiRoomInputs
            roomName={roomName}
            roomCapacity={roomCapacity}
            officeBlock={officeBlock}
            officeFloor={officeFloor}
            blockOptions={blockOptionsList}
            floorOptions={floorOptions}
            handleInputChange={this.handleInputChange}
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
  dojoMutation: PropTypes.func.isRequired,
  officeDetails: PropTypes.shape({
    getOfficeByName: PropTypes.array,
  }).isRequired,
};

export default compose(
  graphql(GET_NAIROBI_DETAILS, { name: 'officeDetails' }),
  graphql(ADD_ROOM_TO_THE_DOJO, { name: 'dojoMutation' }),
)(AddRoomNairobi);
