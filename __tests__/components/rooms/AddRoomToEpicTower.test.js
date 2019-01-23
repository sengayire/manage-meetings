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
    };
  });

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
    epicTower.instance().handleInputChange({ target: { name: 'roomName', value: 'room2' } });
    expect(epicTower.instance().state.roomName).toEqual('room2');
  });

  it('should change room capacity', () => {
    epicTower.instance().handleInputChange({ target: { name: 'roomCapacity', value: '' } });
    expect(epicTower.instance().state.roomCapacity).toEqual(0);
  });

  it('should change room capacity from clicking up button', () => {
    epicTower.instance().handleInputChange({ target: { name: 'up' } }, 3);
    expect(epicTower.instance().state.roomCapacity).toEqual(3);
  });

  it('should not change room capacity from clicking up button but empty string is passed', () => {
    epicTower.instance().handleInputChange({ target: { name: 'up', value: '' } });
    expect(epicTower.instance().state.roomCapacity).toEqual(0);
  });

  it('should not change room capacity from clicking up button but number value not passed', () => {
    epicTower.instance().handleInputChange({ target: { name: 'up' } });
    expect(epicTower.instance().state.roomCapacity).toEqual(0);
  });

  it('should change room capacity', () => {
    epicTower.instance().handleInputChange({ target: { name: 'roomCapacity', value: 10 } });
    expect(epicTower.instance().state.roomCapacity).toEqual(10);
  });

  it('should change room floor', () => {
    epicTower.instance().state = {
      ...epicTower.instance().state,
      wingsObject: {
        1: [{ name: 'wing1', id: 1 }],
      },
    };
    epicTower.instance().handleInputChange({ target: { name: 'roomFloor', value: 1 } });
    expect(epicTower.instance().state.roomFloor).toEqual(1);
  });

  it('should change room wing', () => {
    epicTower.instance().state = {
      ...epicTower.instance().state,
      wingsObject: {
        1: [{ name: 'wing1', id: 1 }],
      },
    };
    epicTower.instance().handleInputChange({ target: { name: 'roomWing', value: 1 } });
    expect(epicTower.instance().state.roomWing).toEqual(1);
  });

  it('should parse value to integer when an empty string is provided', () => {
    epicTower.instance().state = {
      ...epicTower.instance().state,
      wingsObject: {
        1: [{ name: 'wing1', id: 1 }],
      },
    };
    epicTower.instance().handleInputChange({ target: { name: 'roomWing', value: '' } });
    expect(epicTower.instance().state.roomWing).toEqual(0);
  });

  it('should make a mutation', async () => {
    const preventDefault = jest.fn();
    epicTower.instance().state = {
      ...epicTower.instance().state,
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomWing: 1,
    };
    await epicTower.instance().handleAddRoom({ preventDefault });
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should make a mutation', async () => {
    const preventDefault = jest.fn();
    let response;
    const mockProps = {
      officeDetails: {},
      epicTowerMutation: jest.fn(() => Promise.resolve(response)),
    };

    const epicTowerWrapper = shallow(<AddRoomToEpicTower {...mockProps} />);
    epicTowerWrapper.instance().state = {
      ...epicTowerWrapper.instance().state,
      imageUrl: 'path/to/image.jpg',
      roomName: 'room1',
      roomFloor: 1,
      roomCapacity: 10,
      roomWing: 1,
    };
    await epicTowerWrapper.instance().handleAddRoom({ preventDefault });
    wrapper.update();
    expect(mockProps.epicTowerMutation).toHaveBeenCalled();
  });

  it('should not make a mutation', async () => {
    const preventDefault = jest.fn();
    let response;
    const mockProps = {
      officeDetails: {},
      epicTowerMutation: jest.fn(() => Promise.resolve(response)),
    };

    const epicTowerWrapper = shallow(<AddRoomToEpicTower {...mockProps} />);
    await epicTowerWrapper.instance().handleAddRoom({ preventDefault });
    wrapper.update();
    expect(mockProps.epicTowerMutation).not.toHaveBeenCalled();
  });

  it('should display image name', () => {
    const imageFiles = [
      {
        name: 'image-name',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    epicTower.instance().handleInputChange({ target: { name: 'selectImage', files: imageFiles } });
    expect(epicTower.instance().state.thumbnailName).toEqual('image-name');
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
    epicTower.instance().handleInputChange({ target: { name: 'selectImage', files: imageFiles } });
    expect(epicTower.instance().state.thumbnailName).toEqual('fail');
  });

  it('should reduce long image name', () => {
    const imageFiles = [
      {
        name: 'thisIsAVeryLongFileNameFeelFreeToReduceXters',
        type: 'image/jpeg',
        size: 1024,
        webKitRelativePath: '',
      },
    ];
    epicTower.instance().handleInputChange({ target: { name: 'selectImage', files: imageFiles } });
    expect(epicTower.instance().state.thumbnailName.length).toEqual(25);
  });
});
