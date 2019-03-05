import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { roomLocations } from '../../../__mocks__/rooms/Rooms';
import WrappedAddRoomToNairobi, { AddRoomNairobi } from '../../../src/components/rooms/AddRoomNairobi';
import { ADD_ROOM_TO_THE_DOJO } from '../../../src/graphql/mutations/rooms/AddRoomToDojo';
import { addRoom, variables } from '../../../__mocks__/rooms/AddRoomNairobi';

describe('AddRoomNairobi', () => {
  const wrapperCode = (
    <MockedProvider
      mocks={[
        {
          request: {
            query: ADD_ROOM_TO_THE_DOJO,
            variables: { ...variables },
          },
          result: {
            ...addRoom,
          },
        },
      ]}
      addTypename={false}
    >
      <WrappedAddRoomToNairobi locations={roomLocations} />
    </MockedProvider>
  );
  const wrapper = mount(wrapperCode);
  const theDojo = wrapper.find('AddRoomNairobi');
  beforeEach(() => {
    theDojo.instance().state = {
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
    };
  });

  it('should not have a form before modal pops up', () => {
    expect(wrapper.find('form')).toHaveLength(0);
  });

  it('should pop up a modal when modal button is clicked', () => {
    const modalButton = wrapper.find('#modal-button');
    expect(modalButton).toHaveLength(1);
    modalButton.simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal state', () => {
    theDojo.instance().handleModalStateChange();
    expect(theDojo.instance().state.closeModal).toBeFalsy();
  });

  it('should have two select and two text input elements', () => {
    expect(wrapper.find('Input').length).toBe(2);
    expect(wrapper.find('SelectInput').length).toBe(3);
  });

  it('should handle change in roomName', () => {
    theDojo.instance().handleInputChange({ target: { name: 'roomName', value: 'room2' } });
    expect(theDojo.instance().state.roomName).toEqual('room2');
  });

  it('should handle change in remoteRoomName', () => {
    theDojo.instance().handleInputChange({ target: { name: 'remoteRoomName', value: 'Nairobi' } });
    expect(theDojo.instance().state.remoteRoomName).toEqual('Nairobi');
  });

  it('should change in roomCapacity', () => {
    theDojo.instance().handleInputChange({ target: { name: 'roomCapacity', value: '' } });
    expect(theDojo.instance().state.roomCapacity).toEqual(0);
  });

  it('should handle increment in roomCapacity', () => {
    theDojo.instance().handleInputChange({ target: { name: 'up' } }, 3);
    expect(theDojo.instance().state.roomCapacity).toEqual(3);
  });

  it('should not increment roomCapacity when num is empty', () => {
    theDojo.instance().handleInputChange({ target: { name: 'up', value: '' } });
    expect(theDojo.instance().state.roomCapacity).toEqual(0);
  });

  it('should not increment roomCapacity when num is undefined', () => {
    theDojo.instance().handleInputChange({ target: { name: 'up' } });
    expect(theDojo.instance().state.roomCapacity).toEqual(0);
  });

  it('should change room capacity', () => {
    theDojo.instance().handleInputChange({ target: { name: 'roomCapacity', value: 10 } });
    expect(theDojo.instance().state.roomCapacity).toEqual(10);
  });

  it('should handle change in officeBlock', () => {
    theDojo.instance().state = {
      ...theDojo.instance().state,
      floorObject: {
        1: [{ id: 1, name: 'Block A' }],
      },
    };
    theDojo.instance().handleInputChange({ target: { name: 'officeBlock', value: 1 } });
    expect(theDojo.instance().state.officeBlock).toEqual(1);
  });

  it('should handle change in officeFloor', () => {
    theDojo.instance().state = {
      ...theDojo.instance().state,
      floorObject: {
        1: [{ id: 1, name: 'first floor' }],
      },
    };
    theDojo.instance().handleInputChange({ target: { name: 'officeFloor', value: 1 } });
    expect(theDojo.instance().state.officeFloor).toEqual(1);
  });

  it('should have form and close the modal when the form is submitted', () => {
    const preventDefault = jest.fn();
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);

    form.simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should parse value to integer when an empty string is provided', () => {
    theDojo.instance().state = {
      ...theDojo.instance().state,
      floorObject: {
        1: [{ name: 'first Floor', id: 1 }],
      },
    };
    theDojo.instance().handleInputChange({ target: { name: 'officeFloor', value: '0' } });
    expect(theDojo.instance().state.officeFloor).toEqual(0);
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
    theDojo.instance().state = {
      ...theDojo.instance().state,
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomBlock: 1,
      files,
    };
    await theDojo.instance().handleAddRoom({ preventDefault });
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should make a mutation', async () => {
    const preventDefault = jest.fn();
    let response;
    const mockProps = {
      officeDetails: {},
      dojoMutation: jest.fn(() => Promise.resolve(response)),
    };
    const files = [
      {
        name: 'image-name.jpeg',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    const dojoWrapper = shallow(<AddRoomNairobi {...mockProps} />);
    dojoWrapper.instance().state = {
      ...dojoWrapper.instance().state,
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomWing: 1,
      files,
    };
    await dojoWrapper.instance().handleAddRoom({ preventDefault });
    wrapper.update();
    expect(dojoWrapper.state().imageUrl).toEqual('path/to/image.jpg');
  });

  it('should not make a mutation', async () => {
    const preventDefault = jest.fn();
    let response;
    const mockProps = {
      officeDetails: {},
      dojoMutation: jest.fn(() => Promise.resolve(response)),
    };
    const dojoWrapper = shallow(<AddRoomNairobi {...mockProps} />);
    await dojoWrapper.instance().handleAddRoom({ preventDefault });
    wrapper.update();
    expect(mockProps.dojoMutation).not.toHaveBeenCalled();
  });

  it('should add image to state', async () => {
    let response;
    const mockProps = {
      officeDetails: {},
      epicTowerMutation: jest.fn(() => Promise.resolve(response)),
    };
    const epicTowerWrapper = shallow(<AddRoomNairobi {...mockProps} />);
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
    epicTowerWrapper.instance().updateThumbnailState(files, imageUrl, thumbnailName);
    expect(epicTowerWrapper.state().thumbnailName).toEqual('image-name.jpeg');
    expect(epicTowerWrapper.state().imageUrl).toEqual('upload/image-name.jpeg');
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
    theDojo.instance().handleAddRoom({ preventDefault: jest.fn(), target: { files: imageFiles } });
    expect(theDojo.instance().state.thumbnailName).toEqual('Upload a thumbnail');
  });
});
