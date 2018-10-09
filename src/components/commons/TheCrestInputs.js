import React from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/addroomCrest.scss';

const TheCrestInputs = ({
  roomName, roomFloor, floorOptionsList, roomCapacity, handleInputChange,
}) => (
  <div className="kla-inputs">
    <Input
      id="roomName"
      name="roomName"
      placeholder="Enter room name"
      value={roomName}
      labelName="Room Name"
      onChange={handleInputChange}
      required
    />
    <div className="two-inputs">
      <Select
        labelText="Select Floor"
        name="roomFloor"
        id="roomFloor"
        value={roomFloor}
        options={floorOptionsList}
        onChange={handleInputChange}
        wrapperClassName="floor-wrapper"
        placeholder="Select floor"
        selectInputClassName="floor-wrapper default-select"
      />
      <div className="num-inputs">
        <Input
          labelName="Room Capacity"
          name="roomCapacity"
          id="roomCapacity"
          type="number"
          controlsClass="kla-controls"
          labelClass="kla-label"
          inputClass="mrm-input capacity-wrapper"
          value={roomCapacity}
          onChange={handleInputChange}
          placeholder="1"
        />
      </div>
    </div>
  </div>
);

TheCrestInputs.propTypes = {
  roomName: PropTypes.string.isRequired,
  roomFloor: PropTypes.number.isRequired,
  floorOptionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  roomCapacity: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default TheCrestInputs;
