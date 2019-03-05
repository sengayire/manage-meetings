import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { roomLocations } from '../../../__mocks__/rooms/Rooms';
import WrappedAddRoomToEpicTower, { AddRoomToEpicTower } from '../../../src/components/rooms/AddRoomToEpicTower';
import GET_EPIC_TOWER_DETAILS_QUERY from '../../../src/graphql/queries/Offices';
import { ADD_ROOM_TO_EPIC_TOWER } from '../../../src/graphql/mutations/rooms/AddRoomToEpicTower';
import addRoomToEpicTower, { variables } from '../../../__mocks__/rooms/AddRoomToEpicTower';
import officeDetailsData from '../../../__mocks__/offices/Offices';

describe('AddRoomEpicTower', () => {
  const wrapperCode = (
    <MockedProvider
      mocks={[
        {
          request: {
            query: ADD_ROOM_TO_EPIC_TOWER,
            variables: { ...variables },
          },
          result: {
            ...addRoomToEpicTower,
          },
        },
        {
          request: {
            query: GET_EPIC_TOWER_DETAILS_QUERY,
          },
          result: officeDetailsData,
        },
      ]}
      addTypename={false}
    >
      <WrappedAddRoomToEpicTower locations={roomLocations} />
    </MockedProvider>
  );
  const wrapper = mount(wrapperCode);
  const epicTower = wrapper.find('AddRoomToEpicTower');
  beforeEach(() => {
    epicTower.instance().state = {
      imageUrl: '',
      roomName: '',
      remoteRoomName: '',
      roomFloor: 0,
      roomType: 'meeting',
      roomCalendar: 'andela.com1',
      floorOptions: [],
      roomCapacity: 0,
      roomWing: 0,
      wingsObject: {},
      wingOptions: [],
      closeModal: false,
      thumbnailName: 'Upload a thumbnail',
      officeId: 1,
      files: [],
    };
  });

  const event = {
    target: {
      name: '',
      value: '',
      files: [
        {
          name: 'someImage.jpeg',
          size: 137000,
          type: 'image/jpeg',
          webKitRelativePath: '',
        },
      ],
    },
    preventDefault: jest.fn(),
  };

  it('should render properly', async () => {
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal', () => {
    epicTower.instance().handleCloseModal();
    expect(epicTower.instance().state.closeModal).toBeTruthy();
  });

  it('should change modal state', () => {
    epicTower.instance().state = {
      closeModal: true,
    };
    epicTower.instance().handleModalStateChange();
    expect(epicTower.instance().state.closeModal).toBeFalsy();
  });

  it('should change room name', () => {
    event.target.name = 'roomName';
    event.target.value = 'room2';
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomName).toEqual('room2');
  });

  it('should handle change in remoteRoomName', () => {
    epicTower.instance().handleInputChange({ target: { name: 'remoteRoomName', value: 'Nairobi' } });
    expect(epicTower.instance().state.remoteRoomName).toEqual('Nairobi');
  });

  it('should change room capacity', () => {
    epicTower.instance().handleInputChange({ target: { name: 'roomCapacity', value: '' } });
    expect(epicTower.instance().state.roomCapacity).toEqual(0);
  });

  it('should change room capacity from clicking up button', () => {
    event.target.name = 'roomCapacity';
    event.target.value = 3;
    epicTower.instance().handleInputChange(event, 3);
    expect(epicTower.instance().state.roomCapacity).toEqual(3);
  });

  it('should change room capacity by default', () => {
    event.target.name = '';
    event.target.value = 3;
    epicTower.instance().handleInputChange(event, 3);
    expect(epicTower.instance().state.roomCapacity).toEqual(3);
  });

  it('should not change room capacity from clicking up button but empty string is passed', () => {
    event.target.name = 'up';
    event.target.value = '';
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomCapacity).toEqual(0);
  });

  it('should not change room capacity from clicking up button but number value not passed', () => {
    event.target.name = 'up';
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomCapacity).toEqual(0);
  });

  it('should change room capacity', () => {
    event.target.name = 'roomCapacity';
    event.target.value = 10;
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomCapacity).toEqual(10);
  });

  it('should change room floor', () => {
    epicTower.instance().state = {
      ...epicTower.instance().state,
      wingsObject: {
        1: [{ name: 'wing1', id: 1 }],
      },
    };
    event.target.name = 'roomFloor';
    event.target.value = 1;
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomFloor).toEqual(1);
  });

  it('should change room wing', () => {
    epicTower.instance().state = {
      ...epicTower.instance().state,
      wingsObject: {
        1: [{ name: 'wing1', id: 1 }],
      },
    };
    event.target.name = 'roomWing';
    event.target.value = 1;
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomWing).toEqual(1);
  });

  it('should parse value to integer when an empty string is provided', () => {
    epicTower.instance().state = {
      ...epicTower.instance().state,
      wingsObject: {
        1: [{ name: 'wing1', id: 1 }],
      },
    };
    event.target.name = 'roomWing';
    event.target.value = '';
    epicTower.instance().handleInputChange(event);
    expect(epicTower.instance().state.roomWing).toEqual(0);
  });

  it('should make a mutation', async () => {
    const preventDefault = jest.fn();
    const imageFiles = [
      {
        name: 'fail',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    epicTower.instance().state = {
      ...epicTower.instance().state,
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomWing: 1,
      files: imageFiles,
    };
    await epicTower.instance().handleAddRoom({ preventDefault });
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should make a mutation', async () => {
    let response;
    const preventDefault = jest.fn();
    const mockProps = {
      officeDetails: {},
      epicTowerMutation: jest.fn(() => Promise.resolve(response)),
    };
    const epicTowerWrapper = shallow(<AddRoomToEpicTower {...mockProps} />);
    const imageFiles = [
      {
        name: 'fail',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    epicTowerWrapper.instance().state = {
      ...epicTowerWrapper.instance().state,
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomWing: 1,
      files: imageFiles,
    };
    await epicTowerWrapper.instance().handleAddRoom({ preventDefault });
    wrapper.update();
    expect(epicTowerWrapper.state().roomFloor).toBe(1);
  });

  it('should not make a mutation', async () => {
    let response;
    const mockProps = {
      officeDetails: {},
      epicTowerMutation: jest.fn(() => Promise.resolve(response)),
    };
    const epicTowerWrapper = shallow(<AddRoomToEpicTower {...mockProps} />);
    await epicTowerWrapper.instance().handleAddRoom(event);
    wrapper.update();
    expect(mockProps.epicTowerMutation).not.toHaveBeenCalled();
  });

  it('should add image to state', async () => {
    let response;
    const mockProps = {
      officeDetails: {},
      epicTowerMutation: jest.fn(() => Promise.resolve(response)),
    };
    const epicTowerWrapper = shallow(<AddRoomToEpicTower {...mockProps} />);
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
    event.target.files = imageFiles;
    epicTower.instance().handleAddRoom(event);
  });
});
