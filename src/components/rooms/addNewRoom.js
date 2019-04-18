import React, { Component } from 'react';
import MrmModal from '../commons/MrmModal';
import SelectImage from '../commons/SelectImage';
import { SelectInput, Input } from '../commons';
import { getAllRemoteRooms, getRoomsStructure } from '../helpers/QueriesHelpers';
import orderByLevel from '../../utils/formatSetupData';
import stripTypenames from '../helpers/StripTypeNames';
import '../../assets/styles/addNewRoom.scss';

class AddNewRoom extends Component {
  state = {
    thumbnailName: 'Upload a thumbnail',
    imageUrl: '',
    rooms: [],
    roomCapacity: 0,
    roomName: '',
    remoteRoomName: '',
    levels: [],
    roomType: '',
    // eslint-disable-next-line react/no-unused-state
    files: [],
  };

  componentDidMount() {
    this.fetchRemoteRooms();
    this.getLevels();
  }

  /**
   * get the levels set in the office structure
   *
   *  @returns {void}
   */
  getLevels = async () => {
    const data = await getRoomsStructure();
    const { allStructures } = data;
    const formattedLevels = orderByLevel(stripTypenames(allStructures));
    this.setState({
      levels: formattedLevels,
    });
  }

  /**
   * fetches all remote/Google calendar rooms
   *
   *  @returns {void}
   */
  fetchRemoteRooms = async () => {
    const allRemoteRooms = await getAllRemoteRooms();
    if (allRemoteRooms) {
      this.setState({ rooms: allRemoteRooms.rooms });
    }
  }

  handleInputChange = () => {};

  /**
   * Capitalises first letter of string
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
    const { rooms, remoteRoomName } = this.state;
    return (
      <SelectInput
        labelText="Select Google Calendar Room"
        name="remoteRoomName"
        id="remoteRoomName"
        value={remoteRoomName}
        options={rooms}
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
  renderModalContent = () => (
    <div className="modal-form">
      {this.renderImageUpload()}
      {this.renderRemoteRoomSelect()}
      {this.renderStaticInputFields()}
      <div className="dynamic-input">
        {this.renderRoomType()}
        {this.renderLevelInputFields()}
      </div>
    </div>
  )

  render() {
    return (
      <MrmModal
        buttonText="Add New Room"
        title="Add New Room"
        modalContent={this.renderModalContent()}
      />
    );
  }
}

export default AddNewRoom;
