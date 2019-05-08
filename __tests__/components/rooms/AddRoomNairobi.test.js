import React from 'react';
import { shallow } from 'enzyme';
import { roomLocations } from '../../../__mocks__/rooms/Rooms';
import { AddRoomNairobi } from '../../../src/components/rooms/AddRoomNairobi';

describe('AddRoomNairobi', () => {
  let res;
  const mockProps = {
    officeDetails: {},
    dojoMutation: jest.fn(() => Promise.resolve(res)),
  };
  const wrapper = shallow(<AddRoomNairobi locations={roomLocations} {...mockProps} />);
  beforeEach(() => {
    wrapper.setState({
      imageUrl: '',
      roomName: '',
      remoteRoomName: '',
      roomFloor: 0,
      roomType: 'meeting',
      roomCalendar: 'andela.com1',
      blockOptions: [],
      roomCapacity: 0,
      roomBlock: 0,
      floorObject: {},
      floorOptions: [],
      closeModal: true,
      thumbnailName: 'Upload a thumbnail',
      officeId: 1,
      files: [],
    });
  });

  it('should close modal state', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state.closeModal).toBeFalsy();
  });

  it('should handle change in roomName', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomName', value: 'room2' } });
    wrapper.update();
    expect(wrapper.state('roomName')).toEqual('room2');
  });

  it('should handle change in remoteRoomName', () => {
    wrapper.instance().handleInputChange({ target: { name: 'remoteRoomName', value: 'Nairobi' } });
    wrapper.update();
    expect(wrapper.state('remoteRoomName')).toEqual('Nairobi');
  });

  it('should change in roomCapacity', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomCapacity', value: '' } });
    wrapper.update();
    expect(wrapper.state('roomCapacity')).toEqual(0);
  });

  it('should handle increment in roomCapacity', () => {
    wrapper.instance().handleInputChange({ target: { name: 'up' } }, 3);
    wrapper.update();
    expect(wrapper.state('roomCapacity')).toEqual(3);
  });

  it('should not increment roomCapacity when num is empty', () => {
    wrapper.instance().handleInputChange({ target: { name: 'up', value: '' } });
    wrapper.update();
    expect(wrapper.state('roomCapacity')).toEqual(0);
  });

  it('should not increment roomCapacity when num is undefined', () => {
    wrapper.instance().handleInputChange({ target: { name: 'up' } });
    wrapper.update();
    expect(wrapper.state('roomCapacity')).toEqual(0);
  });

  it('should change room capacity', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomCapacity', value: 10 } });
    wrapper.update();
    expect(wrapper.state('roomCapacity')).toEqual(10);
  });

  it('should handle change in officeBlock', () => {
    wrapper.setState({
      floorObject: {
        1: [{ id: 1, name: 'Block A' }],
      },
    });
    wrapper.instance().handleInputChange({ target: { name: 'officeBlock', value: 1 } });
    expect(wrapper.state('officeBlock')).toEqual(1);
  });

  it('should handle change in officeFloor', () => {
    wrapper.setState({
      floorObject: {
        1: [{ id: 1, name: 'first floor' }],
      },
    });
    wrapper.instance().handleInputChange({ target: { name: 'officeFloor', value: 1 } });
    expect(wrapper.state('officeFloor')).toEqual(1);
  });

  it('should have form and close the modal when the form is submitted', () => {
    const preventDefault = jest.fn();
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);

    form.simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should parse value to integer when an empty string is provided', () => {
    wrapper.setState({
      floorObject: {
        1: [{ name: 'first Floor', id: 1 }],
      },
    });
    wrapper.instance().handleInputChange({ target: { name: 'officeFloor', value: '0' } });
    wrapper.update();
    expect(wrapper.state('officeFloor')).toEqual(0);
  });

  it('should make a addRoom mutation', async () => {
    const response = { data: { createRoom: { room: { name: 'roomName' } } } };
    mockProps.dojoMutation = jest.fn(() => Promise.resolve(response));
    const component = shallow(<AddRoomNairobi locations={roomLocations} {...mockProps} />);
    const preventDefault = jest.fn();
    const files = [
      {
        name: 'image-name.jpeg',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    component.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomBlock: 1,
      files,
    });
    await component.instance().handleAddRoom({ preventDefault });
    component.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should show an error message when addRoom mutation was not successful', async () => {
    const response = { graphQLErrors: [{ message: 'my-message' }] };
    mockProps.dojoMutation = jest.fn(() => Promise.reject(response));
    const component = shallow(<AddRoomNairobi locations={roomLocations} {...mockProps} />);
    const preventDefault = jest.fn();
    const files = [
      {
        name: 'image-name.jpeg',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    component.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomBlock: 1,
      files,
    });
    await component.instance().handleAddRoom({ preventDefault });
    component.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should make a mutation', async () => {
    const preventDefault = jest.fn();
    const files = [
      {
        name: 'image-name.jpeg',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    const component = shallow(<AddRoomNairobi {...mockProps} />);
    component.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomWing: 1,
      files,
    });
    await component.instance().handleAddRoom({ preventDefault });
    component.update();
    expect(component.state().imageUrl).toEqual('path/to/image.jpg');
  });

  it('should not make a mutation', async () => {
    const preventDefault = jest.fn();
    let response;
    const newMockProps = {
      officeDetails: {},
      dojoMutation: jest.fn(() => Promise.resolve(response)),
    };
    const component = shallow(<AddRoomNairobi {...newMockProps} />);
    await component.instance().handleAddRoom({ preventDefault });
    component.update();
    expect(newMockProps.dojoMutation).not.toHaveBeenCalled();
  });

  it('should add image to state', async () => {
    const dojoMutationWrapper = shallow(<AddRoomNairobi {...mockProps} />);
    window.URL.createObjectURL = jest.fn(() => 'upload/image-name');
    const files = [
      {
        name: 'image-name.jpeg',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    const imageUrl = 'upload/image-name.jpeg';
    const thumbnailName = 'image-name.jpeg';
    dojoMutationWrapper.instance().updateThumbnailState(files, imageUrl, thumbnailName);
    expect(dojoMutationWrapper.state().thumbnailName).toEqual('image-name.jpeg');
    expect(dojoMutationWrapper.state().imageUrl).toEqual('upload/image-name.jpeg');
  });

  it('should display error on failure to upload', () => {
    const imageFiles = [
      {
        name: 'fail',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    wrapper.instance().handleAddRoom({ preventDefault: jest.fn(), target: { files: imageFiles } });
    expect(wrapper.instance().state.thumbnailName).toEqual('Upload a thumbnail');
  });
});
