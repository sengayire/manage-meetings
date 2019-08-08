import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, SelectInput, ActionButtons } from '../commons';

const deleteMessage = formData =>
  (
    <p id="confirm-msg">
      Are you sure you want to delete &quot;{`${formData.name}: ${formData.deviceType}`}
      &quot;? <br />
      This cannot be undone
    </p>
  );

const innerForm = (formData, methods, data) =>
  (
    <Fragment>
      <Input
        id="device-name"
        name="device-name"
        placeholder="Enter Device Name"
        labelName="Device Name"
        labelClass="device-input"
        value={formData.name}
        onChange={methods.handleNameChange}
      />
      <SelectInput
        labelText="Device Type"
        name="device-type"
        id="add-devices-type"
        isValue
        value={formData.deviceType || 'Select Device'}
        options={data.deviceTypes}
        onChange={methods.handleTypeChange}
        wrapperClassName="device-input"
        placeholder="Select Device"
        selectInputClassName="dynamic-input-field default-select"
      />
      <SelectInput
        labelText="Room"
        name="room"
        id="add-devices-rooms"
        value={formData.roomId || 'Select Room'}
        options={data.rooms}
        onChange={methods.handleRoomChange}
        wrapperClassName="device-input"
        placeholder="Select Room"
        selectInputClassName="dynamic-input-field default-select"
      />
    </Fragment>
  );

const DeviceModalContent = (props) => {
  const { formData, methods } = props;
  const {
    modalContent, rooms, deviceTypes, fetching,
  } = props;
  return (
    <form className="amenity-form device-type">
      <div>
        {modalContent !== 'delete' ? innerForm(formData, methods, { deviceTypes, rooms })
          : deleteMessage(formData)}
        <div className="loading-btn-div">
          <ActionButtons
            withCancel
            isLoading={fetching}
            onClickCancel={methods.closeModal}
            actionButtonText={`${modalContent ? ((modalContent !== 'delete') ?
              'SAVE CHANGES' : 'DELETE') : 'SUBMIT'} `}
            onClickSubmit={methods.submit}
          />
        </div>
      </div>
    </form>);
};

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
