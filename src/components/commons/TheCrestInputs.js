import React from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/addroomCrest.scss';

/**
 * Reusable component for the Crest Inputs
 *
 * @param {Object} theCrestInputsObject
 *
 * @returns {JSX}
 */
const TheCrestInputs = ({
  roomName,
  roomFloor,
  floorOptionsList,
  roomCapacity,
  handleInputChange,
  allRemoteRooms,
}) => (
  <div className="kla-inputs">
    <Select
      labelText="Select Room"
      name="roomName"
      id="roomName"
      value={roomName}
      options={allRemoteRooms}
      onChange={handleInputChange}
      wrapperClassName="floor-wrapper"
      placeholder="Select Room"
      selectInputClassName="room-wrapper default-select"
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
  allRemoteRooms: PropTypes.arrayOf(PropTypes.object),
  roomCapacity: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
TheCrestInputs.defaultProps = {
  allRemoteRooms: [{}],
};

export default TheCrestInputs;
