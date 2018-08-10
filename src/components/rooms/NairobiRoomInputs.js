import React from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput as Select } from '../commons';
import '../../assets/styles/addroom.scss';

const NairobiRoomInputs = ({
  roomName, roomCapacity, officeBlock, officeFloor, handleInputChange,
}) => (
  <div className="form-inputs">
    <Input
      labelName="Room Name"
      name="roomName"
      value={roomName}
      placeholder="Enter room name"
      id="roomName"
      onChange={handleInputChange}
    />

    <Input
      type="number"
      min="1"
      name="roomCapacity"
      labelName="Room Capacity"
      id="roomCapacity"
      onChange={handleInputChange}
      value={roomCapacity}
      placeholder={1}
    />

    <Select
      labelText="Select Block"
      name="officeBlock"
      id="officeBlock"
      value={officeBlock}
      onChange={handleInputChange}
      wrapperClassName="input-wrapper"
      placeholder="Select block"
      options={[{ value: 'A' }, { value: 'B' }]}
    />

    <Select
      labelText="Select Floor"
      name="officeFloor"
      id="officeFloor"
      value={officeFloor}
      onChange={handleInputChange}
      wrapperClassName="input-wrapper"
      placeholder="Select floor"
      options={[{ value: 1 }, { value: 2 }, { value: 3 }]}
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
