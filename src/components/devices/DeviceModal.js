import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import notification from '../../utils/notification';
import MrmModal from '../commons/Modal';
import { addDeviceMutation, editDeviceMutation, deleteDeviceMutation } from '../helpers/mutationHelpers/devices';
import DeviceModalContent from './DeviceModalContent';

class DeviceFormModal extends Component {
  state = {
    closeModal: false,
    name: '',
    roomId: '',
    deviceType: '',
    previousFormState: {},
  }

  componentDidUpdate({ openModal: prevOpenModal }) {
    const { openModal, device } = this.props;
    const { closeModal } = this.state;
    if (openModal && !prevOpenModal) {
      this.setDeviceState(device);
    } else if (!openModal && closeModal) {
      this.setCloseModal(false);
      this.updateStateWithStoredData();
    }
  }

  setDeviceState = ({ name, room: { id: roomId }, deviceType }) =>
    this.setState({
      name, roomId, deviceType, closeModal: false,
    });

  setCloseModal = closeModal => this.setState({ closeModal })

  getDeviceTypes = () => ([{
    name: '7"',
  }, {
    name: '8"',
  }, {
    name: '9.7"',
  }, {
    name: '10.1"',
  }])

  updateStateWithStoredData = () => {
    this.setState(({ previousFormState, ...prevState }) =>
      ({ ...prevState, ...previousFormState }));
  };


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
    this.handleFormData(this.props.openModal, this.state.closeModal);
    this.setState({ closeModal: true });
    this.props.closeModal();
  };

  clearForm = wipeHistory => this.setState({
    fetching: false,
    name: '',
    roomId: '',
    deviceType: '',
    ...(wipeHistory && { previousFormState: {} }),
  });

  handleFormData = (openModal, closeModal) => {
    // only clear form if in edit mode, openModal is true only if in edit mode
    if (openModal) {
      this.clearForm();
    } else if (!closeModal) { // store data for modal re-open if in add mode
      this.setState(({ name, roomId, deviceType }) => ({
        previousFormState: {
          name, roomId, deviceType,
        },
      }));
    }
  };

  handleMutation = async () => {
    const { name, roomId, deviceType } = this.state;
    const {
      location: { name: location }, openModal, device, refetch,
    } = this.props;
    const mutations = {
      edit: editDeviceMutation,
      delete: deleteDeviceMutation,
      add: addDeviceMutation,
    };

    const variables = {
      edit: {
        deviceId: device.id,
        name: name || device.name,
        roomId: roomId || device.roomId,
        deviceType: deviceType || device.deviceType,
        location,
      },
      delete: { deviceId: device.id, location },
      add: {
        name, roomId, deviceType, location,
      },
    };

    const mutation = openModal ? mutations[openModal] : mutations.add;
    const variable = openModal ? variables[openModal] : variables.add;

    await mutation(variable);
    return refetch();
  };

  submit = async (e) => {
    e.preventDefault();
    const { name, roomId, deviceType } = this.state;
    const { openModal, closeModal, getRooms } = this.props;
    if (
      (!name || !roomId || !deviceType) && !openModal
    ) {
      return notification(toastr, 'error', 'Please fill all fields')();
    }

    try {
      this.setState({ fetching: true });
      await this.handleMutation();
      this.clearForm(true);
      this.setState({ closeModal: true });
      getRooms();
      closeModal();
      return notification(toastr, 'success', `Device successfully ${openModal ? `${openModal}ed` : 'added'}.`)();
    } catch (error) {
      notification(toastr, 'error', 'Could not complete request.')();
      return this.setState({ fetching: false });
    }
  };

  render() {
    const {
      closeModal: closeModalMethod,
      submit,
      handleNameChange,
      handleRoomChange,
      handleTypeChange,
    } = this;
    const { openModal, rooms } = this.props;
    const {
      closeModal, previousFormState, fetching, ...formData
    } = this.state;
    return (
      <MrmModal
        title={`${!openModal ? 'ADD A NEW' : openModal.toUpperCase()} DEVICE`}
        buttonText="Add a New Device"
        openModal={!!openModal}
        closeModal={closeModal}
        handleCloseRequest={this.closeModal}
        className="add-resource-modal"
      >
        <DeviceModalContent
          formData={formData}
          modalContent={openModal}
          methods={{
            closeModal: closeModalMethod,
            submit,
            handleNameChange,
            handleRoomChange,
            handleTypeChange,
          }}
          fetching={fetching}
          rooms={rooms}
          deviceTypes={this.getDeviceTypes()}
        />
      </MrmModal>
    );
  }
}

DeviceFormModal.propTypes = {
  rooms: PropTypes.instanceOf(Array),
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  refetch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
  device: PropTypes.shape({
    name: PropTypes.string,
    deviceType: PropTypes.string,
    roomId: PropTypes.number,
  }),
};

DeviceFormModal.defaultProps = {
  rooms: [],
  location: undefined,
  device: undefined,
};

export default DeviceFormModal;
