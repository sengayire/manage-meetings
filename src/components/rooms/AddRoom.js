import React, { Component, createRef } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import MrmModal from '../commons/MrmModal';
import SelectImage from '../commons/SelectImage';
import { SelectInput, Input } from '../commons';
import {
  getAllRemoteRooms,
  getRoomsStructure,
  getUserDetails,
  getAllLocations,
  getRemoteRoomsAllLocations,
} from '../helpers/QueriesHelpers';
import { orderByLevel } from '../../utils/formatSetupData';
import notification from '../../utils/notification';
import stripTypeNames from '../helpers/StripTypeNames';
import { addRoom } from '../helpers/mutationHelpers/rooms';
import getImageUrl from '../helpers/ImageUpload';
import updateRoom from '../../components/helpers/mutationHelpers/update';
import tranformInputLevel from '../../components/helpers/editRoomHelper';
import '../../assets/styles/addNewRoom.scss';
import LocationFilters from '../navbars/LocationFilters';

export class AddNewRoom extends Component {
  constructor(props) {
    super(props);
    this.modal = createRef();
    this.state = {
      thumbnailName: 'Upload a thumbnail',
      imageUrl: '',
      rooms: [],
      roomsAllLocations: [],
      isAllRemoteRooms: false,
      roomCapacity: 0,
      roomName: '',
      remoteRoomName: '',
      levels: [],
      roomType: '',
      files: [],
      levelInput: [],
      structureId: '',
      locationId: '',
      isLoading: false,
      isRoomStateUpdated: false,
    };
  }

  componentDidMount() {
    this.fetchRemoteRooms();
    this.getLevels();
    this.setLocationId();
  }

  setLocationId = async () => {
    const user = await getUserDetails();
    const allLocations = await getAllLocations();
    const userLocation = allLocations.find(location => location.name === user.location);
    this.setState({
      locationId: userLocation.id,
      location: user.location,
    });
  };

  /**
   * get the levels set in the office structure
   *
   *  @returns {void}
   */
  getLevels = async () => {
    const data = await getRoomsStructure();
    const { allStructures } = data;
    const formattedLevels = orderByLevel(stripTypeNames(allStructures));
    this.setState({
      levels: formattedLevels,
    });
  };
  // eslint-disable-next-line react/sort-comp
  /**
   * It invokes the toggle modal method
   * @params {null}
   *
   * @returns {null}
   */
  // eslint-disable-next-line react/sort-comp
  toggleModal = () => {
    this.modal.current.toggleModalByRef();
  };
  /**
   * fetches all remote/Google calendar rooms
   *
   *  @returns {void}
   */
  fetchRemoteRooms = async () => {
    const allRemoteRooms = await getAllRemoteRooms();
    const remoteRoomsAllLocations = await getRemoteRoomsAllLocations();
    if (allRemoteRooms && remoteRoomsAllLocations) {
      this.setState({
        rooms: allRemoteRooms.rooms,
        roomsAllLocations: remoteRoomsAllLocations.rooms,
      });
    }
  };

  handleInputChange = ({
    target,
  }) => {
    const { id, value } = target;
    const structureId = target.selectedOptions[0].getAttribute('structure');
    const { levelInput } = this.state;
    const findTagExists = levelInput.find(level => (level.id === id));
    let arr;
    if (findTagExists) {
      if (findTagExists.value === value) {
        arr = levelInput;
      }
      if (findTagExists.value !== value) {
        levelInput[levelInput.findIndex(el => el.id === id)] = { id, value };
        arr = [...levelInput];
      }
    }
    if (!findTagExists) {
      arr = [...levelInput, { id, value }];
    }
    this.setState({
      ...({ structureId, structureName: value }),
      levelInput: arr,
    });
  };

  /**
   * Capitalizes first letter of string
   * and returns the new string
   *
   * @param {string}
   *
   * @returns {string}
   */
  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  handleOtherInputChange = ({
    target: {
      id, value, name, options, selectedIndex,
    },
  }, num) => {
    const { levelInput } = this.state;
    const inputField = name === 'up' || name === 'down' ? 'roomCapacity' : name;
    const arr = levelInput.find(level => level.id === id)
      ? levelInput
      : [
        ...levelInput,
        { id, ...(name === 'levelInput' && { value: options[selectedIndex].text }) },
      ];
    this.setState({
      ...(name === 'levelInput' && { structureId: value, structureName: options[selectedIndex].text }),
      [inputField]: name === 'levelInput' ? arr : value || num,
    });
  };

  /**
   *It updates the state value of the
   * thumbnail, image and imageUrl
   *
   * @returns {void}
   */
  updateThumbnailState = (files, imageUrl, thumbnailName) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ files, imageUrl, thumbnailName });
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
  };

  /**
   * Ensures that when a user hits CANCEL on the modal or when the
   * adding a new room is successful, then modal closes
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.modal.current.toggleModal();
    this.setState({
      imageUrl: '',
      thumbnailName: 'Upload a thumbnail',
    });
  };

  isValidEntry = ({
    roomsAllLocations,
    remoteRoomName,
    roomName,
    roomType,
    files,
    roomCapacity,
  }) => (
    roomName
      && roomCapacity
      && roomType
      && remoteRoomName
      && files.length
      && roomsAllLocations.length
  )

  stripSpaces = str => str.split(' ').join('');

  getLabels = (arr) => {
    const labels = [];
    arr.forEach(elem => labels.push(elem.value));
    return labels;
  }

  createRoom = async () => {
    if (this.isValidEntry(this.state)) {
      this.toggleLoading();
      const {
        roomsAllLocations,
        remoteRoomName,
        roomName,
        roomType,
        locationId,
        files,
        roomCapacity,
        structureId,
        levelInput,
      } = this.state;
      const roomId = roomsAllLocations.filter(room =>
        this.stripSpaces(room.name) === this.stripSpaces(remoteRoomName),
      );
      const calendarId = roomId.length ? roomId[0].calendarId : null;
      const variables = {
        name: roomName,
        capacity: roomCapacity,
        roomType,
        calendarId,
        roomLabels: this.getLabels(levelInput),
        locationId: Number(locationId),
        structureId,
      };

      getImageUrl('upload/', files[0]).then((url) => {
        variables.imageUrl = url;
        this.setState({ imageUrl: url, uploading: false }, () => {
          addRoom(variables, this.state.location)
            .then((data) => {
              this.props.updateRoomData(data);
              this.toggleLoading();
              this.handleCloseModal();
              notification(toastr, 'success', `${roomName} Successfully added`)();
              this.clearForm();
              this.props.clearFilter();
            })
            .catch((err) => {
              this.toggleLoading();
              this.handleCloseModal();
              notification(toastr, 'error', err.graphQLErrors[0].message)();
            });
        });
      });
    } else notification(toastr, 'error', 'All fields are required')();
  }

  clearForm = () => {
    this.setState({
      thumbnailName: 'Upload a thumbnail',
      imageUrl: '',
      isAllRemoteRooms: false,
      roomCapacity: 0,
      roomName: '',
      remoteRoomName: '',
      roomType: '',
      files: [],
      levelInput: [],
      isLoading: false,
    });
  };

  /**
   * Handles click on button to toggle options under
   * the remote room select component through changing
   * the boolean value of isAllRemoteRooms
   *
   * @returns {void}
   */
  handleClick = () => {
    const { isAllRemoteRooms } = this.state;
    this.setState({
      isAllRemoteRooms: !isAllRemoteRooms,
    });
  };
  /**
   * Gets room update details from state
   * @params {object}
   * @returns{object}
   */
  getUpdatedDetails = (dataObject) => {
    const { editData } = this.props;
    const {
      numberOfSeats: roomCapacity,
      roomImage: imageUrl,
      roomName,
      roomType,
      structureId,
    } = editData;
    const newEditData = {
      roomCapacity,
      files: [],
      roomName,
      roomType,
      imageUrl,
      structureId,
      levelInput: [],
    };
    const extractedStateData = this.getRequiredData(dataObject, newEditData);
    const data = {};
    const getKeys = Object.keys(extractedStateData).filter(
      key =>
        (typeof extractedStateData[key] === 'number' && extractedStateData[key] > 0) ||
        extractedStateData[key].length,
    );
    getKeys.forEach((key) => {
      data[key] = dataObject[key];
    });
    return { data, getKeys };
  };
  /*
   * Get the required edit data from state
   * @params {object} target
   * @params {object} source
   * @returns {object} newStateData
   */
  getRequiredData = (target, source) => {
    const sourceKey = Object.keys(source);
    const newStateData = {};
    sourceKey.forEach((key) => {
      newStateData[key] = target[key];
    });
    return newStateData;
  };
  /**
   * It updates a room
   * @returns {func} handleCloseModal
   */
  editRoom = async () => {
    const { updateRoomData, editData, clearFilter } = this.props;
    const { roomId, roomLabels, structureId } = editData;
    const { data: DataToUpdate, getKeys } = this.getUpdatedDetails(this.state);
    const getImageKey = getKeys.indexOf('files');
    DataToUpdate.structureId = structureId;

    if (getKeys.length === 0) {
      return notification(toastr, 'error', 'No field was edited')();
    }
    if (getImageKey >= 0) {
      DataToUpdate.imageUrl = await getImageUrl('upload/', DataToUpdate.files[0]);
    }
    if (DataToUpdate.levelInput && DataToUpdate.levelInput.length) {
      const { levelInput } = DataToUpdate;
      DataToUpdate.roomLabels = tranformInputLevel(roomLabels, levelInput);
      DataToUpdate.structureId = this.state.structureId;
    }
    const data = {
      ...DataToUpdate,
      roomId,
    };
    const response = await updateRoom(this.props.currentPage, data);
    this.toggleLoading();
    if (response.allRooms) {
      await updateRoomData(response);
      notification(toastr, 'success', 'Room Successfully edited')();
      this.toggleLoading();
      clearFilter();
      return this.handleCloseModal();
    }
    notification(toastr, 'error', 'An error occured, please try again later')();
    return this.handleCloseModal();
  };
  /**
   * It renders the SelectImage component
   * for thumbnail upload
   *
   * @returns {JSX}
   */
  renderImageUpload = () => {
    const { imageUrl, thumbnailName } = this.state;
    const { editData, formType } = this.props;
    const imageUrlValue = formType === 'edit' ? imageUrl || editData.roomImage : imageUrl;
    return (
      <SelectImage
        updateThumbnailState={this.updateThumbnailState}
        imageUrl={imageUrlValue}
        thumbnailName={thumbnailName}
      />
    );
  };

  /**
   * It renders the SelectInput component
   * for selecting room from the Google calendar
   *
   * @returns {JSX}
   */
  renderRemoteRoomSelect = () => {
    const {
      rooms, remoteRoomName, isAllRemoteRooms, roomsAllLocations,
    } = this.state;
    return (
      <SelectInput
        labelText={
          isAllRemoteRooms
            ? 'Select Google Calendar Room from all locations'
            : 'Select Google Calendar Room'
        }
        name="remoteRoomName"
        id="remoteRoomName"
        onClick={this.handleClick}
        value={remoteRoomName}
        options={isAllRemoteRooms ? roomsAllLocations : rooms}
        onChange={this.handleOtherInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select Google Calendar Room"
        selectInputClassName="remote-room-select default-select"
      />
    );
  };

  /**
   * It renders the SelectInput component
   * for roomType
   *
   * @returns {JSX}
   */
  renderRoomType = () => {
    const { roomType } = this.state;
    const { editData, formType } = this.props;
    const roomTypeValue = formType === 'edit' ? editData.roomType : roomType;
    return (
      <SelectInput
        labelText="Select room type"
        name="roomType"
        id="roomType"
        value={roomTypeValue}
        options={[{ name: 'Meeting room' }, { name: 'Call room' }]}
        onChange={this.handleOtherInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select room type"
        selectInputClassName="dynamic-input-field default-select"
      />
    );
  };
  /**
   * It renders the SelectInput components
   * for the levels set in the office structure
   *
   * @returns {JSX}
   */
  // eslint-disable-next-line consistent-return
  renderLevelInputFields = () => {
    const { levels } = this.state;
    const { editData, formType } = this.props;
    if (levels.length > 0) {
      return levels
        .filter((level) => {
          const { tag } = level;
          const childLength = level.children.length;
          const anyTag = tag.toLowerCase();
          if (childLength > 1 && anyTag !== 'rooms') {
            return true;
          }
          return false;
        })
        .map((level, i) => {
          const { children, tag } = level;
          const tagValue =
            formType === 'edit' && editData.roomLabels ? editData.roomLabels[i] : tag;
          return (
            <SelectInput
              key={(i + 1).toString()}
              labelText={this.capitalizeFirstLetter(tag)}
              name="levelInput"
              id={(i + 1).toString()}
              value={tagValue}
              options={children}
              onChange={this.handleInputChange}
              wrapperClassName="floor-wrapper"
              placeholder={`Select ${tag}`}
              selectInputClassName="dynamic-input-field default-select"
            />
          );
        });
    }
  };

  /**
   * It renders the SelectInput component
   * for the room name and capacity
   *
   * @returns {JSX}
   */
  renderStaticInputFields = () => {
    const { roomCapacity, roomName } = this.state;
    const { editData, formType } = this.props;
    const roomNameValue = formType === 'edit' ? editData.roomName : roomName;
    const roomCapacityValue = formType === 'edit' ? editData.numberOfSeats : roomCapacity;
    return (
      <div className="static-input">
        <Input
          id="roomName"
          name="roomName"
          labelClass="floor-wrapper"
          inputClass="mrm-input mrm-input-rm"
          placeholder="Enter room name"
          value={roomNameValue}
          labelName="Room Name"
          onChange={this.handleOtherInputChange}
          required
        />
        <Input
          id="roomCapacity"
          name="roomCapacity"
          type="number"
          labelClass="floor-wrapper"
          inputClass="mrm-input mrm-input-rc"
          controlsClass="capacity-controls"
          placeholder="0"
          title="Please add numbers only"
          value={roomCapacityValue}
          labelName="Room Capacity"
          onChange={this.handleOtherInputChange}
          required
        />
      </div>
    );
  };

  /**
   * It renders the content of the modal
   *
   * @returns {JSX}
   */
  renderModalContent = () => {
    const { isAllRemoteRooms } = this.state;
    return (
      <div className="modal-form">
        {this.renderImageUpload()}
        <div className="remote-room-input">
          {this.renderRemoteRoomSelect()}
          <button
            className="remote-room-all"
            onClick={this.handleClick}
            tooltip={isAllRemoteRooms ? 'Load your rooms...' : 'Load all rooms...'}
          >
            ...
          </button>
        </div>
        {this.renderStaticInputFields()}
        <div className="dynamic-input">
          {this.renderRoomType()}
          <LocationFilters handleInputChange={this.handleInputChange} wrapperClassName="floor-wrapper" selectInputClassName="dynamic-input-field default-select" displayTitle />
        </div>
      </div>
    );
  };

  render() {
    const { type, formType: typeOfForm, editData } = this.props;
    const formType = typeOfForm === 'edit' ? `Edit ${editData.roomName}` : 'Add New Room';
    return (
      <MrmModal
        type={type}
        ref={this.modal}
        buttonText="Add New Room"
        title={formType}
        modalContent={this.renderModalContent()}
        handleSubmit={typeOfForm === 'edit' ? this.editRoom : this.createRoom}
        isLoading={this.state.isLoading}
        handleCloseModal={this.clearForm}
        actionButtonText={typeOfForm === 'edit' ? 'SAVE CHANGES' : 'SUBMIT'}
      />
    );
  }
}

AddNewRoom.propTypes = {
  updateRoomData: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  type: PropTypes.number,
  formType: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  editData: PropTypes.object,
};
AddNewRoom.defaultProps = {
  type: 1,
  formType: 'Add New Room',
  editData: {},
};

export default AddNewRoom;
