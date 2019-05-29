import React, { Component, createRef } from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import MrmModal from '../commons/MrmModal';
import SelectImage from '../commons/SelectImage';
import { SelectInput, Input } from '../commons';
import { getAllRemoteRooms, getRoomsStructure, getUserDetails, getAllLocations, getRemoteRoomsAllLocations } from '../helpers/QueriesHelpers';
import { orderByLevel } from '../../utils/formatSetupData';
import notification from '../../utils/notification';
import stripTypeNames from '../helpers/StripTypeNames';
import { addRoom } from '../helpers/mutationHelpers/rooms';
import getImageUrl from '../helpers/ImageUpload';
import '../../assets/styles/addNewRoom.scss';

export class AddNewRoom extends Component {
  state = {
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
    locationId: '',
    isLoading: false,
  };

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
  }

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
  }

  modal = createRef();

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
  }

  handleInputChange = ({
    target: {
      id, value, name, options, selectedIndex,
    },
  }, num) => {
    const { levelInput } = this.state;
    const inputField = (name === 'up' || name === 'down') ? 'roomCapacity' : name;
    const arr = levelInput.find(level => level.id === id)
      ? levelInput : [...levelInput, { id, value }];
    this.setState({
      ...(name === 'levelInput' && { structureId: value, structureName: options[selectedIndex].text }),
      [inputField]: name === 'levelInput' ? arr : value || num,
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

  /**
   *It updates the state value of the
   * thumbnail, image and imageUrl
   *
   * @returns {void}
   */
  updateThumbnailState = (files, imageUrl, thumbnailName) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ files, imageUrl, thumbnailName });
  }

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
    rooms, remoteRoomName, roomName, roomType, files, roomCapacity, levels, levelInput,
  }) => {
    const expectedLevelInputLength = levels.filter(({ children: { length } }) => length > 1).length;
    const allLevelsCompleted = expectedLevelInputLength === levelInput.length;
    return (
      roomName
      && roomCapacity
      && roomType
      && remoteRoomName
      && files.length
      && rooms.length
      && allLevelsCompleted
    );
  }

  stripSpaces = str => str.split(' ').join('');

  createRoom = async () => {
    if (this.isValidEntry(this.state)) {
      this.toggleLoading();
      const {
        rooms, remoteRoomName, roomName, roomType, structureName,
        locationId, files, roomCapacity, structureId,
      } = this.state;
      const roomId = rooms.filter(room =>
        this.stripSpaces(room.name) === this.stripSpaces(remoteRoomName),
      );
      const calendarId = roomId.length ? roomId[0].calendarId : null;
      const variables = {
        name: roomName,
        capacity: roomCapacity,
        roomType,
        calendarId,
        roomLabels: [structureName],
        locationId: Number(locationId),
        structureId,
      };
      getImageUrl('upload/', files[0])
        .then((url) => {
          variables.imageUrl = url;
          this.setState({ imageUrl: url, uploading: false }, () => {
            addRoom(variables, this.state.location)
              .then((data) => {
                this.props.updateRoomData(data);
                this.toggleLoading();
                this.handleCloseModal();
                notification(toastr, 'success', `${roomName} Successfully added`)();
                this.clearForm();
              }).catch((err) => {
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
  }

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
  }

  /**
   * It renders the SelectImage component
   * for thumbnail upload
   *
   * @returns {JSX}
   */
  renderImageUpload = () => {
    const { imageUrl, thumbnailName } = this.state;
    return (
      <SelectImage
        updateThumbnailState={this.updateThumbnailState}
        imageUrl={imageUrl}
        thumbnailName={thumbnailName}
      />
    );
  }

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
        labelText={isAllRemoteRooms ? 'Select Google Calendar Room from all locations' : 'Select Google Calendar Room'}
        name="remoteRoomName"
        id="remoteRoomName"
        onClick={this.handleClick}
        value={remoteRoomName}
        options={isAllRemoteRooms ? roomsAllLocations : rooms}
        onChange={this.handleInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select Google Calendar Room"
        selectInputClassName="remote-room-select default-select"
      />
    );
  }

  /**
   * It renders the SelectInput component
   * for roomType
   *
   * @returns {JSX}
   */
  renderRoomType = () => {
    const { roomType } = this.state;
    return (
      <SelectInput
        labelText="Select room type"
        name="roomType"
        id="roomType"
        value={roomType}
        options={[{ name: 'Meeting room' }, { name: 'Call room' }]}
        onChange={this.handleInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select room type"
        selectInputClassName="dynamic-input-field default-select"
      />
    );
  }

  /**
   * It renders the SelectInput components
   * for the levels set in the office structure
   *
   * @returns {JSX}
   */
  // eslint-disable-next-line consistent-return
  renderLevelInputFields = () => {
    const { levels } = this.state;
    if (levels.length > 0) {
      return levels.filter((level) => {
        const { tag } = level;
        const childLength = level.children.length;
        const anyTag = tag.toLowerCase();
        if ((childLength > 1) && (anyTag !== 'rooms')) {
          return true;
        }
        return false;
      }).map((level, i) => {
        const { children, tag } = level;
        return (
          <SelectInput
            key={(i + 1).toString()}
            labelText={this.capitalizeFirstLetter(tag)}
            name="levelInput"
            id={(i + 1).toString()}
            value={tag}
            options={children}
            onChange={this.handleInputChange}
            wrapperClassName="floor-wrapper"
            placeholder={`Select ${tag}`}
            selectInputClassName="dynamic-input-field default-select"
          />
        );
      });
    }
  }

  /**
   * It renders the SelectInput component
   * for the room name and capacity
   *
   * @returns {JSX}
   */
  renderStaticInputFields = () => {
    const { roomCapacity, roomName } = this.state;
    return (
      <div className="static-input">
        <Input
          id="roomName"
          name="roomName"
          labelClass="static-input-field"
          inputClass="mrm-input"
          placeholder="Enter room name"
          value={roomName}
          labelName="Room Name"
          onChange={this.handleInputChange}
          required
        />
        <Input
          id="roomCapacity"
          name="roomCapacity"
          type="number"
          labelClass="static-input-field"
          inputClass="mrm-input"
          controlsClass="capacity-controls"
          placeholder="0"
          title="Please add numbers only"
          value={roomCapacity}
          labelName="Room Capacity"
          onChange={this.handleInputChange}
          required
        />
      </div>
    );
  }

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
          <button className="remote-room-all" onClick={this.handleClick} tooltip={isAllRemoteRooms ? 'Load your rooms...' : 'Load all rooms...'}>...</button>
        </div>
        {this.renderStaticInputFields()}
        <div className="dynamic-input">
          {this.renderRoomType()}
          {this.renderLevelInputFields()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <MrmModal
        ref={this.modal}
        buttonText="Add New Room"
        title="Add New Room"
        modalContent={this.renderModalContent()}
        handleSubmit={this.createRoom}
        isLoading={this.state.isLoading}
        handleCloseModal={this.clearForm}
      />
    );
  }
}

AddNewRoom.propTypes = {
  updateRoomData: PropTypes.func.isRequired,
};

export default AddNewRoom;
