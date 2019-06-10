import React from 'react';
import { shallow } from 'enzyme';
import DeviceModalContent from '../../../src/components/devices/DeviceModalContent';


jest.mock('../../../src/components/helpers/mutationHelpers/devices');

describe('Device modal content tests', () => {
  let wrapper;
  const props = {
    formData: {
      name: '',
      deviceType: '',
      roomId: '',
    },
    methods: {
      handleNameChange: jest.fn(),
      handleTypeChange: jest.fn(),
      handleRoomChange: jest.fn(),
      closeModal: jest.fn(),
      submit: jest.fn(),
    },
    rooms: [],
    deviceTypes: [],
    fetching: false,
  };
  beforeAll(() => {
    wrapper = shallow(<DeviceModalContent
      {...props}
    />);
  });

  it('Should render for "add" correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render for "delete" correctly', () => {
    wrapper.setProps({
      modalContent: 'delete',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render for "edit" correctly', () => {
    wrapper.setProps({
      modalContent: 'edit',
      formData: {
        name: 'foo',
        deviceType: 'bar',
        roomId: '32',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
