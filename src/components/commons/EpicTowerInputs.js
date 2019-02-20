import React from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select } from '.';
import '../../assets/styles/addroom.scss';

/**
 * Reusabel input fields
 *
 * @param {Object} epicTowerInputObject
 *
 * @returns {JSX}
 */
const EpicTowerInputs = ({
  roomName,
  roomFloor,
  floorOptions,
  roomCapacity,
  roomWing,
  wingOptions,
  handleInputChange,
  allRemoteRooms,
}) => (
  <div className="epic-tower-inputs">
    <Select
      labelText="Select Room"
      name="roomName"
      id="roomFloor"
      value={roomName}
      onChange={handleInputChange}
      options={allRemoteRooms}
      wrapperClassName="floor-label"
      placeholder="Select Room"
      placeholderValue=""
      selectInputClassName="floor-wrapper default-select"
    />
    <Input
      id="roomCapacity"
      name="roomCapacity"
      type="number"
      labelClass="capacity-label"
      inputClass="mrm-input epic-tower-input"
      placeholder="0"
      title="Please add numbers only"
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
      options={floorOptions}
      wrapperClassName="floor-label"
      placeholder="Select floor"
      placeholderValue=""
      selectInputClassName="floor-wrapper default-select"
      required
    />
    <Select
      labelText="Select Wing"
      name="roomWing"
      id="roomWing"
      value={roomWing}
      onChange={handleInputChange}
      options={wingOptions}
      wrapperClassName="wing-label"
      placeholder="Select Wing"
      placeholderValue=""
      selectInputClassName="wing-wrapper default-select"
      required
    />
  </div>
);

EpicTowerInputs.propTypes = {
  roomName: PropTypes.string.isRequired,
  roomFloor: PropTypes.number.isRequired,
  floorOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  roomCapacity: PropTypes.number.isRequired,
  roomWing: PropTypes.number.isRequired,
  allRemoteRooms: PropTypes.arrayOf(PropTypes.object),
  wingOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
EpicTowerInputs.defaultProps = {
  allRemoteRooms: [{}],
};

export default EpicTowerInputs;
