import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import toastr from 'toastr';
import Modal from '../commons/Modal';
import { ActionButtons } from '../commons';
import '../../assets/styles/addroom.scss';
import SelectImage from '../commons/SelectImage';
import EpicTowerInputs from '../commons/EpicTowerInputs';
import { ADD_ROOM_TO_EPIC_TOWER } from '../../graphql/mutations/AddRoomToEpicTower';
import GET_EPIC_TOWER_DETAILS_QUERY from '../../graphql/queries/Offices';
import mapOfficeDetails from '../../graphql/mappers/Offices';
import notification from '../../utils/notification';
import getImageUrl from '../helpers/ImageUpload';
import hasInvalidInputs from '../helpers/InputValidators';
import getThumbnailName from '../helpers/thumbnailName';

export class AddRoomToEpicTower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomType: 'meeting',
      roomCalendar: 'andela.com1',
      officeId: 1,
      imageUrl: '',
      roomName: '',
      roomFloor: 0,
      uploading: false,
      floorOptions: [],
      roomCapacity: 0,
      roomWing: 0,
      wingsObject: {},
      wingOptions: [],
      closeModal: false,
      thumbnailName: 'Upload a thumbnail',
    };
  }
  componentWillReceiveProps = (props) => {
    const { officeDetails } = props;

    /* istanbul ignore next */
    if (officeDetails.getOfficeByName) {
      const { floorOptions, wingsObject, officeId } = mapOfficeDetails(
        officeDetails,
      );
      this.setState({
        floorOptions,
        wingsObject,
        officeId,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      imageUrl: '',
      roomName: '',
      roomFloor: 0,
      roomWing: 0,
      closeModal: true,
      roomCapacity: 0,
      thumbnailName: 'Upload a thumbnail',
    });
  };

  handleInputChange = (event, num) => {
    const {
      target: { name, value, files },
    } = event;
    let thumbnailName;
    let intValue;
    let imageUrl;
    const { wingsObject } = this.state;

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

      case 'roomFloor':
        intValue = parseInt(value, 10);
        this.setState(
          { [name]: intValue, roomWing: 0, wingOptions: [] },
          () => {
            this.setState({
              wingOptions: wingsObject[intValue],
            });
          },
        );
        break;
      case 'roomCapacity':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      case 'roomWing':
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
        this.setState({ [name]: intValue });
        break;
      default:
        intValue = value === '' ? 0 : value;
        intValue = parseInt(intValue, 10);
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
      roomType,
      roomWing,
      roomName,
      roomFloor,
      roomCapacity,
      roomCalendar,
      officeId,
      imageUrl,
    } = this.state;
    if (!hasInvalidInputs(this.state)) {
      this.props
        .epicTowerMutation({
          variables: {
            roomType,
            roomWingId: roomWing,
            roomName,
            roomFloorId: roomFloor,
            roomCapacity,
            roomCalendar,
            roomImageUrl: imageUrl,
            office_id: officeId,
          },
        })
        .then((res) => {
          this.handleCloseModal();
          /** Notify user of sucess of adding of room */
          notification(
            toastr,
            'success',
            `${res.data.createRoom.room.name} Sucessfully added`,
          )();
          /** Clear the state and restore default values */
        })
        .catch((err) => {
          /** Notify user on failure to add room */

          notification(toastr, 'error', err.message)();
        });
    }
  };

  render() {
    const {
      roomName,
      roomWing,
      wingOptions,
      roomFloor,
      floorOptions,
      roomCapacity,
      closeModal,
      thumbnailName,
      imageUrl,
    } = this.state;
    let floorOptionsList = floorOptions;
    const { officeDetails } = this.props;

    if (officeDetails.loading) {
      floorOptionsList = [{ id: 0, name: 'Loading FLoors' }];
    }

    return (
      <Modal
        title="ADD ROOM"
        buttonText="Epic Tower"
        closeModal={closeModal}
        handleCloseRequest={this.handleModalStateChange}
        className="add-room-modal"
      >
        <form
          className="modal-form epic-tower-form"
          onSubmit={this.handleAddRoom}
        >
          <SelectImage
            onChange={this.handleInputChange}
            thumbnailName={thumbnailName}
            imageUrl={imageUrl}
          />
          <EpicTowerInputs
            roomName={roomName}
            roomWing={roomWing}
            wingOptions={wingOptions}
            roomFloor={roomFloor}
            floorOptions={floorOptionsList}
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
AddRoomToEpicTower.propTypes = {
  officeDetails: PropTypes.shape({
    getOfficeByName: PropTypes.array,
  }).isRequired,
  epicTowerMutation: PropTypes.func.isRequired,
};
export default compose(
  graphql(GET_EPIC_TOWER_DETAILS_QUERY, { name: 'officeDetails' }),
  graphql(ADD_ROOM_TO_EPIC_TOWER, { name: 'epicTowerMutation' }),
)(AddRoomToEpicTower);
