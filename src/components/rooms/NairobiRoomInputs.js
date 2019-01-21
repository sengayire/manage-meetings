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
  handleInputChange,
}) => (
  <div className="form-inputs">
    <Input
      labelName="Room Name"
      name="roomName"
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
      wrapperClassName="input-wrapper"
      placeholder="Select block"
      options={[{ id: 2, name: 'A' }]}
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
      options={[{ id: 2, name: 2 }]}
      required
    />
  </div>
);

NairobiRoomInputs.propTypes = {
  roomName: PropTypes.string.isRequired,
  officeFloor: PropTypes.string.isRequired,
  roomCapacity: PropTypes.number.isRequired,
  officeBlock: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default NairobiRoomInputs;
