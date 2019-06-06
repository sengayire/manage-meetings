import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import DeviceFormModal from '../../../src/components/devices/AddDevice';
import { addDeviceMutation } from '../../../src/components/helpers/mutationHelpers/devices';


jest.mock('../../../src/components/helpers/mutationHelpers/devices');
jest.mock('toastr');

describe('Tests for DeviceFormModal', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<DeviceFormModal
      location={{
      name: 'Lagos',
    }}
      refetch={jest.fn()}
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
    expect(addDeviceMutation).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalled();
  });

  it('Should handle server errors', async () => {
    wrapper.setState({
      name: 'Galaxy S9',
      roomId: '32',
      deviceType: 'Tablet',
    });
    addDeviceMutation.mockRejectedValue({});
    await wrapper.instance().submit({ preventDefault: jest.fn() });
    expect(toastr.error).toHaveBeenCalledWith('An error occured while adding device.');
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
      device: {
        name: 'Galaxy S10',
        roomId: '31',
        deviceType: 'Phone',
      },
    });
    wrapper.instance().componentDidMount();
    expect(wrapper.state('roomId')).toBe('31');
  });

  it('Should close modal', () => {
    wrapper.instance().closeModal();
    wrapper.instance().closeModal({ preventDefault: jest.fn() });
    expect(wrapper.state('isModalClosed')).toBe(true);

    wrapper.instance().handleModalCloseRequest();
    expect(wrapper.state('isModalClosed')).toBe(false);
  });
});
