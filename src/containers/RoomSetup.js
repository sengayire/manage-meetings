import React, { Component } from 'react';
import Room from '../components/rooms/RoomSetup';
import { darkTabletIcon, addIcon } from '../utils/images/images';
import SelectInput from '../components/commons/SelectInput';
import { selectMockData, roomsMockData } from '../utils/roomSetupMock';

/**
 * Builds component for displaying roooms in setup
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class RoomSetup extends Component {
  handleInputChange = () => {}
  /**
  * It handles creating of rooms
  *
  * @returns {jsx}
  */
  createRooms = () => {
    const rooms = roomsMockData && roomsMockData.map(room => (
      <Room
        key={room.roomName}
        roomImage={darkTabletIcon}
        roomName={room.roomName}
        wingName={room.wingName}
        floorName={room.floorName}
        blockName="BLOCK-NAME"
        numberOfSeats={room.numberOfSeats}
        numberOfResources={room.numberOfResources}
      />
    ));
    return rooms;
  }
  /**
  * It handles creating of select input
  *
  * @returns {jsx}
  */
  createSelectInputs = () => {
    const selectInputs = selectMockData && selectMockData.map(({
      name, id, value, placeholder,
    }) => (
      <div key={id} className="room-select-sub">
        <SelectInput
          labelText=""
          wrapperClassName="setup-select-input-wrapper"
          name={name}
          id={id}
          value={value}
          onChange={this.handleInputChange}
          selectInputClassName="setup-select-input"
          placeholder={placeholder}
          options={null}
        />
      </div>
    ));
    return selectInputs;
  }
  render() {
    return (
      <div className="setup-container">
        <div className="room-setup-header"><p>EPIC Tower&apos;s Meeting Room {'(3)'}</p></div>
        <div className="room-select-input">
          {this.createSelectInputs()}
        </div>
        <div className="room-setup-container">
          {this.createRooms()}
          <div className="room-setup-card addroom-setup">
            <button className="setup-card-button">
              <img src={addIcon} alt="add-button" />
            </button>
            <h4>Add a Room</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomSetup;
