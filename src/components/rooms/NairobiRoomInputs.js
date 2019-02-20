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
  roomName, roomCapacity, officeBlock, officeFloor, blockOptions, floorOptions, handleInputChange,
  allRemoteRooms,
}) => (
  <div className="form-inputs">
    <Select
      labelText="Select Room"
      name="roomName"
      id="officeBlock"
      value={roomName}
      onChange={handleInputChange}
      wrapperClassName="input-wrapper"
      placeholder="Select Room"
      options={allRemoteRooms}
      required
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
      wrapperClassName="input-wrapper"
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
  officeFloor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  roomCapacity: PropTypes.number.isRequired,
  officeBlock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  blockOptions: PropTypes.array.isRequired,
  floorOptions: PropTypes.array.isRequired,
  allRemoteRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default NairobiRoomInputs;
