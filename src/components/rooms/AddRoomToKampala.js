import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import TheCrestInputs from '../commons/TheCrestInputs';
import { GET_CREST_DETAILS } from '../../graphql/queries/Offices';
import { ADD_ROOM_TO_CREST } from '../../graphql/mutations/AddRoomToCrest';
import SelectImage from '../commons/SelectImage';
import '../../assets/styles/addroomCrest.scss';
import notification from '../../utils/notification';
import getImageUrl from '../helpers/ImageUpload';
import getThumbnailName from '../helpers/thumbnailName';
import hasInvalidInputs from '../helpers/InputValidators';


export class AddRoomToTheCrest extends Component {
  state = {
    roomType: 'meeting',
    roomCalendar: 'andela.com1',
    officeId: 0,
    imageUrl: '',
    roomName: '',
    roomFloor: 0,
    uploading: false,
    floorOptions: [],
    roomCapacity: 0,
    closeModal: false,
    thumbnailName: 'Upload a thumbnail',
  };
  componentWillReceiveProps = (props) => {
    const { officeDetails } = props;

    if (officeDetails.getOfficeByName) {
      const { getOfficeByName: [{ id, blocks: [{ floors }] }] } = officeDetails;
      const floorOptions = floors;
      const officeId = id;
      this.setState({
        floorOptions,
        officeId,
      });
    }
  }

  handleCloseModal = () => {
    this.setState({
      imageUrl: '',
      roomName: '',
      roomFloor: 0,
      closeModal: true,
      roomCapacity: 0,
      thumbnailName: 'Upload a thumbnail',
    });
  };

  handleInputChange = ({ target: { name, value, files } }, num) => {
    let thumbnailName;
    let intValue;
    let imageUrl;

    switch (name) {
      case 'selectImage':
        /* Shorten the length of the thumbnail name in case its too long */
        thumbnailName = getThumbnailName(files);
        this.setState(
          { thumbnailName, uploading: true },
          () => {
            getImageUrl('upload/', files[0]).then((url) => {
              imageUrl = url;
              if (typeof (imageUrl) === 'string') {
                this.setState({
                  imageUrl,
                  uploading: false,
                });
              }
            });
          },
        );
        break;

      case 'roomName':
        this.setState({ [name]: value.trim() });
        break;

      case 'roomFloor':
        intValue = parseInt(value, 10);
        this.setState({ [name]: intValue });
        break;
      case 'roomCapacity':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      default:
        intValue = parseInt(num, 10);
        if (num !== undefined) {
          intValue = num;
          this.setState({ roomCapacity: intValue });
        }
    }
  };

  handleModalStateChange = () => {
    this.state.closeModal && this.setState({ closeModal: false });
  };

  handleAddRoom = (event) => {
    event.preventDefault();
    const {
      roomType, roomName, roomFloor, roomCapacity,
      roomCalendar, officeId, imageUrl,
    } = this.state;

    if (!hasInvalidInputs(this.state)) {
      this.props.crestMutation({
        variables: {
          roomType,
          roomName,
          roomFloorId: roomFloor,
          roomCapacity,
          roomCalendar,
          roomImageUrl: imageUrl,
          office_id: officeId,
        },
      }).then((res) => {
        this.handleCloseModal();
        /** Notify user of sucess of adding of room */
        notification(toastr, 'success', `${res.data.createRoom.room.name} Sucessfully added`)();
        /** Clear the state and restore default values */
      })
        .catch((err) => {
          /** Notify user on failure to add room */

          notification(toastr, 'error', err.message)();
        });
    }
  }
  render() {
    const {
      roomName, roomFloor, roomCapacity, closeModal, imageUrl, thumbnailName, floorOptions,
    } = this.state;

    let floorOptionsList = floorOptions;
    const { officeDetails } = this.props;

    if (officeDetails.loading) {
      floorOptionsList = [{ id: 0, name: 'Loading FLoors' }];
    }

    return (
      <Modal
        title="ADD ROOM"
        buttonText="The Crest"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-room-modal"
      >
        <form className="modal-form kla-form" onSubmit={this.handleAddRoom}>
          <SelectImage
            onChange={this.handleInputChange}
            imageUrl={imageUrl}
            thumbnailName={thumbnailName}
          />
          <TheCrestInputs
            roomName={roomName}
            roomFloor={roomFloor}
            floorOptionsList={floorOptionsList}
            roomCapacity={roomCapacity}
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
AddRoomToTheCrest.propTypes = {
  officeDetails: PropTypes.shape({
    getOfficeByName: PropTypes.array,
  }).isRequired,
  crestMutation: PropTypes.func.isRequired,
};
export default compose(
  graphql(GET_CREST_DETAILS, { name: 'officeDetails' }),
  graphql(ADD_ROOM_TO_CREST, { name: 'crestMutation' }),
)(AddRoomToTheCrest);
