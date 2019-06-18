import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import DeviceModal from '../../../src/components/devices/DeviceModal';
import { addDeviceMutation } from '../../../src/components/helpers/mutationHelpers/devices';


jest.mock('../../../src/components/helpers/mutationHelpers/devices');
jest.mock('toastr');

describe('Tests for DeviceFormModal', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<DeviceModal
      location={{
      name: 'Lagos',
    }}
      refetch={jest.fn()}
      closeModal={jest.fn()}
      getRooms={jest.fn()}
      device={{ room: {} }}
    />);
  });

  it('Should render correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should handle submit correctly with correct data', async () => {
    addDeviceMutation.mockResolvedValue({});
    wrapper.setState({
      name: 'Galaxy S9',
      roomId: '32',
      deviceType: 'Tablet',
    });
    await wrapper.instance().submit({ preventDefault: jest.fn() });
    wrapper.setProps({ openModal: 'edit' });
    await wrapper.instance().submit({ preventDefault: jest.fn() });
    expect(addDeviceMutation).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalled();
    wrapper.setProps({ openModal: undefined });
  });

  it('Should handle server errors', async () => {
    wrapper.setState({
      name: 'Galaxy S9',
      roomId: '32',
      deviceType: 'Tablet',
    });
    addDeviceMutation.mockRejectedValue({});
    await wrapper.instance().submit({ preventDefault: jest.fn() });
    expect(toastr.error).toHaveBeenCalledWith('Could not complete request.');
  });


  it('Should not submit with incomplete data', () => {
    wrapper.setState({
      deviceType: undefined,
    });
    wrapper.instance().submit({ preventDefault: jest.fn() });
    expect(toastr.error).toHaveBeenCalledWith('Please fill all fields');
  });

  it('Should call setter methods', () => {
    const getInputObject = value => ({
      target: {
        value,
      },
    });

    wrapper.instance().handleNameChange(getInputObject('Tab'));
    expect(wrapper.state('name')).toBe('Tab');

    wrapper.instance().handleTypeChange(getInputObject('Tablet'));
    expect(wrapper.state('deviceType')).toBe('Tablet');

    wrapper.instance().handleRoomChange(getInputObject('123'));
    expect(wrapper.state('roomId')).toBe('123');
  });

  it('Should use device if provided', () => {
    wrapper.setProps({
      openModal: 'edit',
      device: {
        name: 'Galaxy S10',
        room: {
          id: '31',
        },
        deviceType: 'Phone',
      },
    });
    wrapper.instance().componentDidUpdate({ openModal: false });
    expect(wrapper.state('roomId')).toBe('31');
  });

  describe('Should close modal', () => {
    it('Should close modal and not save if in edit or delete mode', () => {
      wrapper.instance().closeModal();
      expect(wrapper.state('closeModal')).toBe(true);
    });

    it('Should close modal and save if in add mode', () => {
      wrapper.setProps({ openModal: undefined });
      wrapper.setState({ closeModal: false });
      wrapper.instance().closeModal({ preventDefault: jest.fn() });
      expect(wrapper.state('previousFormState')).toEqual({
        name: '',
        roomId: '',
        deviceType: '',
      });
    });
  });

  it('handleFormData should do nothing if no criteria is met', () => {
    wrapper.instance().handleFormData(false, true);
    expect(wrapper.state('closeModal')).toEqual(false);
  });
});
