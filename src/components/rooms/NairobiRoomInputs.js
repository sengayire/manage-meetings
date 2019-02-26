/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/addroom.scss';

/**
 * Component that handles the input of Nairobi office data
 *
 * @param {Object} roomInputObject
 *
 * @returns {JSX}
 */

const NairobiRoomInputs = ({
  roomName,
  roomCapacity,
  officeBlock,
  officeFloor,
  blockOptions,
  floorOptions,
  handleInputChange,
  allRemoteRooms,
  remoteRoomName,
}) => (
  <div className="form-inputs">
    <Select
      labelText="Select Google Calendar Room"
      name="remoteRoomName"
      id="remoteRoomName"
      value={remoteRoomName}
      options={allRemoteRooms}
      onChange={handleInputChange}
      placeholder="Select Google Calendar Room"
      selectInputClassName=" default-select"
    />
    <Input
      labelName="Room Name"
      name="roomName"
      inputClass="mrm-input epic-tower-input"
      value={roomName}
      placeholder="Enter room name"
      id="roomName"
      onChange={handleInputChange}
      required
      pattern="^[a-zA-Z]+(([' .-][a-zA-Z ])?[a-zA-Z]*)*$"
      title="Name cannot be numbers or any special characters"
    />

    <Input
      type="number"
      min="1"
      name="roomCapacity"
      labelName="Room Capacity"
      id="roomCapacity"
      onChange={handleInputChange}
      value={roomCapacity}
      placeholder="1"
      required
    />

    <Select
      labelText="Select Block"
      name="officeBlock"
      id="officeBlock"
      value={officeBlock}
      key={officeBlock}
      onChange={handleInputChange}
      placeholder="Select block"
      options={blockOptions}
      required
    />

    <Select
      labelText="Select Floor"
      name="officeFloor"
      id="officeFloor"
      value={officeFloor}
      onChange={handleInputChange}
      wrapperClassName="input-wrapper"
      placeholder="Select floor"
      options={floorOptions}
      required
    />

  </div>
);

NairobiRoomInputs.propTypes = {
  roomName: PropTypes.string.isRequired,
  remoteRoomName: PropTypes.string.isRequired,
  officeFloor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  roomCapacity: PropTypes.number.isRequired,
  officeBlock: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  blockOptions: PropTypes.array.isRequired,
  floorOptions: PropTypes.array.isRequired,
  allRemoteRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default NairobiRoomInputs;
