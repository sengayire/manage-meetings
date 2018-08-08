import React from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/addroom.scss';

const EpicTowerInputs = ({
  roomName, roomFloor, roomCapacity, roomWing, handleInputChange,
}) => (
  <div className="epic-tower-inputs">
    <Input
      id="roomName"
      name="roomName"
      inputClass="mrm-input epic-tower-input"
      placeholder="Enter room name"
      value={roomName}
      labelName="Room Name"
      onChange={handleInputChange}
      required
    />
    <Input
      id="roomCapacity"
      name="roomCapacity"
      type="number"
      labelClass="capacity-label"
      inputClass="mrm-input epic-tower-input"
      placeholder="1"
      value={roomCapacity}
      labelName="Room Capacity"
      onChange={handleInputChange}
      required
    />
    <Select
      labelText="Select Floor"
      name="roomFloor"
      id="roomFloor"
      value={roomFloor}
      onChange={handleInputChange}
      wrapperClassName="floor-label"
      placeholder="Select floor"
      selectInputClassName="floor-wrapper default-select"
    />
    <Select
      labelText="Select Wing"
      name="roomWing"
      id="roomWing"
      value={roomWing}
      onChange={handleInputChange}
      wrapperClassName="wing-label"
      placeholder="Select Wing"
      selectInputClassName="wing-wrapper default-select"
    />
  </div>
);

EpicTowerInputs.propTypes = {
  roomName: PropTypes.string.isRequired,
  roomFloor: PropTypes.string.isRequired,
  roomCapacity: PropTypes.number.isRequired,
  roomWing: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default EpicTowerInputs;
