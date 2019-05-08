import React from 'react';
import { shallow } from 'enzyme';
import * as firebase from 'firebase';
import { AddRoomToTheCrest } from '../../../src/components/rooms/AddRoomToKampala';
import getImageUrl from '../../../src/components/helpers/ImageUpload';

jest.mock('../../../src/components/helpers/ImageUpload');
jest.mock('firebase');
firebase.storage = jest.fn(() => ({
  ref: jest.fn(() => ({
    // eslint-disable-next-line no-unused-vars
    put: (arg) => {
      Promise.resolve();
    },
  })),
}));
getImageUrl.mockImplementation(arg => Promise.resolve(arg));

describe('AddRoomToKampala', () => {
  let response;
  const mockProps = {
    officeDetails: {},
    crestMutation: jest.fn(() => Promise.resolve(response)),
  };
  const wrapper = shallow(<AddRoomToTheCrest {...mockProps} />);

  beforeEach(() => {
    wrapper.setState({
      imageUrl: '',
      roomName: '',
      remoteRoomName: '',
      roomFloor: 0,
      roomType: 'meeting',
      roomCalendar: 'andela.com1',
      floorOptions: [],
      roomCapacity: 0,
      closeModal: false,
      thumbnailName: 'Upload a thumbnail',
      officeId: 1,
    });
    mockProps.crestMutation.mockClear();
  });

  it('should add room name to state', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomName', value: 'room1' } });
    expect(wrapper.state().roomName).toEqual('room1');
  });

  it('should handle change in remoteRoomName', () => {
    wrapper.instance().handleInputChange({ target: { name: 'remoteRoomName', value: 'Nairobi' } });
    expect(wrapper.instance().state.remoteRoomName).toEqual('Nairobi');
  });

  it('should add room floor to state', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomFloor', value: '1' } });
    expect(wrapper.state().roomFloor).toEqual(1);
    expect(wrapper.state().roomFloor).not.toEqual('1');
  });

  it('should close modal', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state().closeModal).toBeFalsy();
  });

  it('should close modal', () => {
    wrapper.setState({
      closeModal: true,
    });
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state().closeModal).toBeFalsy();
  });

  it('should add room capacity to state', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomCapacity', value: '10' } });
    expect(wrapper.state().roomCapacity).toEqual(10);
    expect(wrapper.state().roomCapacity).not.toEqual('10');
  });

  it('should increment room capacity to state', () => {
    wrapper.instance().handleInputChange({ target: { name: 'up' } }, 12);
    expect(wrapper.state().roomCapacity).toEqual(12);
    expect(wrapper.state().roomCapacity).not.toEqual('12');
  });

  it('should not increment room capacity when num value is undefined', () => {
    wrapper.instance().handleInputChange({ target: { name: 'up' } }, undefined);
    expect(wrapper.state().roomCapacity).toEqual(0);
  });

  it('should add room capacity to state', () => {
    wrapper.instance().handleInputChange({ target: { name: 'roomCapacity', value: '' } });
    expect(wrapper.state().roomCapacity).toEqual(0);
  });

  it('should add image to state', async () => {
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
    wrapper.instance().updateThumbnailState(files, imageUrl, thumbnailName);
    expect(wrapper.state().thumbnailName).toEqual('image-name.jpeg');
    expect(wrapper.state().imageUrl).toEqual('upload/image-name.jpeg');
  });

  it('should not upload and image larger than 200k', async () => {
    window.URL.createObjectURL = jest.fn(() => '');
    const files = [
      {
        name: 'fail',
        type: 'image/jpeg',
        size: 3000024,
        webKitRelativePath: '',
      },
    ];
    await wrapper.instance().handleAddRoom({ preventDefault: jest.fn(), target: { name: 'selectImage', files } });
    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.state().imageUrl).toEqual('');
  });

  it('should create room', async () => {
    const res = { data: { createRoom: { room: { name: 'roomName' } } } };
    mockProps.crestMutation = jest.fn(() => Promise.resolve(res));
    const component = shallow(<AddRoomToTheCrest {...mockProps} />);
    const preventDefault = jest.fn();
    wrapper.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
    });
    await component.instance().handleAddRoom({ preventDefault });
    component.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should show an error message when addRoom mutation was not successful', async () => {
    const res = { graphQLErrors: [{ message: 'my-message' }] };
    mockProps.dojoMutation = jest.fn(() => Promise.reject(res));
    const component = shallow(<AddRoomToTheCrest {...mockProps} />);
    const preventDefault = jest.fn();
    wrapper.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
    });
    await component.instance().handleAddRoom({ preventDefault });
    component.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should not create room when some inputs are missing', async () => {
    const preventDefault = jest.fn();
    wrapper.setState({
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
    });
    await wrapper.instance().handleAddRoom({ preventDefault });
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(mockProps.crestMutation).not.toHaveBeenCalled();
  });
});
