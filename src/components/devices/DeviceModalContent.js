import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput, ActionButtons } from '../commons';

const DeviceModalContent = ({
  formData: {
    name, deviceType, roomId,
  },
  methods: {
    handleNameChange, handleTypeChange, handleRoomChange, closeModal, submit,
  },
  modalContent, rooms, deviceTypes, fetching,
}) => (
  <form className="amenity-form device-type">
    <div>
      {
        modalContent !== 'delete'
          ? (
            <Fragment>
              <Input
                id="device-name"
                name="device-name"
                placeholder="Enter Device Name"
                labelName="Device Name"
                labelClass="device-input"
                value={name}
                onChange={handleNameChange}
              />
              <SelectInput
                labelText="Device Type"
                name="device-type"
                id="add-devices-type"
                isValue
                value={deviceType || 'Select Device'}
                options={deviceTypes}
                onChange={handleTypeChange}
                wrapperClassName="device-input"
                placeholder="Select Device"
                selectInputClassName="dynamic-input-field default-select"
              />
              <SelectInput
                labelText="Room"
                name="room"
                id="add-devices-rooms"
                value={roomId || 'Select Room'}
                options={rooms}
                onChange={handleRoomChange}
                wrapperClassName="device-input"
                placeholder="Select Room"
                selectInputClassName="dynamic-input-field default-select"
              />
            </Fragment>
          ) : (
            <p id="confirm-msg">
              Are you sure you want to delete &quot;{`${name}: ${deviceType}`}
              &quot;? <br />
              This cannot be undone
            </p>
          )
      }
      <div className="loading-btn-div">
        <ActionButtons
          withCancel
          isLoading={fetching}
          onClickCancel={closeModal}
          actionButtonText={modalContent && ((modalContent === 'edit' ? 'SAVE CHANGES' : `${modalContent.toUpperCase()} DEVICE`) || 'ADD DEVICE')}
          onClickSubmit={submit}
        />
      </div>
    </div>
  </form>
);

DeviceModalContent.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    roomId: PropTypes.string,
    deviceType: PropTypes.string,
  }).isRequired,
  methods: PropTypes.shape({
    handleNameChange: PropTypes.func,
    handleRoomChange: PropTypes.func,
    handleTypeChange: PropTypes.func,
    closeModal: PropTypes.func,
    submit: PropTypes.func,
  }).isRequired,
  fetching: PropTypes.bool,
  modalContent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  rooms: PropTypes.instanceOf(Array).isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
};

DeviceModalContent.defaultProps = {
  fetching: false,
  modalContent: undefined,
};

export default DeviceModalContent;
