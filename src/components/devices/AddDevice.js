import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import notification from '../../utils/notification';
import MrmModal from '../commons/Modal';
import { ActionButtons, Input, SelectInput } from '../commons';
import { addDeviceMutation } from '../helpers/mutationHelpers/devices';

class DeviceFormModal extends Component {
  state = {
    isModalClosed: false,
    name: '',
    roomId: '',
    deviceType: '',
  }

  componentDidMount() {
    const { device } = this.props;
    if (device) this.updateStateWithPropDevice();
  }

  getDeviceTypes = () => ([{
    name: '7"',
  }, {
    name: '8"',
  }, {
    name: '9.7"',
  }, {
    name: '10.1"',
  }])

  updateStateWithPropDevice = () => {
    const { name, roomId, deviceType } = this.props.device;
    this.setState({
      name, roomId, deviceType,
    });
  }

  handleNameChange = ({ target: { value: name } }) => {
    this.setState({ name });
  };

  handleTypeChange = ({ target: { value: deviceType } }) => {
    this.setState({ deviceType });
  };

  handleRoomChange = ({ target: { value: roomId } }) => {
    this.setState({ roomId });
  };

  closeModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ isModalClosed: true });
  };

  handleModalCloseRequest = () => {
    this.state.isModalClosed && this.setState({ isModalClosed: false });
  };

  submit = async (e) => {
    e.preventDefault();
    const { name, roomId, deviceType } = this.state;
    const { location, refetch } = this.props;
    if (
      !name || !roomId || !deviceType
    ) {
      return notification(toastr, 'error', 'Please fill all fields')();
    }
    try {
      this.setState({ fetching: true });
      await addDeviceMutation({
        name, roomId, location: location.name, deviceType,
      });
      await refetch();
      this.setState({
        fetching: false,
        isModalClosed: true,
        name: '',
        deviceType: '',
      });

      return notification(toastr, 'success', 'Device successfully added.')();
    } catch (error) {
      notification(toastr, 'error', 'An error occured while adding device.')();
      return this.setState({ fetching: false });
    }
  };

  render() {
    const {
      isModalClosed, name, fetching,
    } = this.state;
    const { rooms } = this.props;
    return (
      <MrmModal
        title="ADD A NEW DEVICE"
        buttonText="Add a New Device"
        closeModal={isModalClosed}
        handleCloseRequest={this.handleModalCloseRequest}
        className="add-resource-modal"
      >
        <form className="amenity-form device-type">
          <div>
            <Input
              id="device-name"
              name="device-name"
              placeholder="Enter Device Name"
              labelName="Device Name"
              labelClass="device-input"
              value={name}
              onChange={this.handleNameChange}
            />
            <SelectInput
              labelText="Device Type"
              name="device-type"
              id="add-devices-type"
              isValue
              value="Select Device"
              options={this.getDeviceTypes()}
              onChange={this.handleTypeChange}
              wrapperClassName="device-input"
              placeholder="Device Type"
              selectInputClassName="dynamic-input-field default-select"
            />
            <SelectInput
              labelText="Room"
              name="room"
              id="add-devices-rooms"
              value="Select Room"
              options={rooms}
              onChange={this.handleRoomChange}
              wrapperClassName="device-input"
              placeholder="Select Room"
              selectInputClassName="dynamic-input-field default-select"
            />
            <div className="loading-btn-div">
              <ActionButtons
                withCancel
                isLoading={fetching}
                onClickCancel={this.closeModal}
                actionButtonText="ADD DEVICE"
                onClickSubmit={this.submit}
              />
            </div>
          </div>
        </form>
      </MrmModal>
    );
  }
}

DeviceFormModal.propTypes = {
  refetch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
  rooms: PropTypes.instanceOf(Array),
  device: PropTypes.shape({
    name: PropTypes.string,
    deviceType: PropTypes.string,
    roomId: PropTypes.number,
  }),
};

DeviceFormModal.defaultProps = {
  location: undefined,
  rooms: [],
  device: undefined,
};

export default DeviceFormModal;
