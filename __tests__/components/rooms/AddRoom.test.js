import React from 'react';
import { shallow } from 'enzyme';
import { AddNewRoom } from '../../../src/components/rooms/AddRoom';
import * as formatSetupData from '../../../src/utils/formatSetupData';
import * as queryHelpers from '../../../src/components/helpers/QueriesHelpers';
import * as stripTypeNames from '../../../src/components/helpers/StripTypeNames';

describe('Unit test for the AddRoom component', () => {
  const props = { addRoom: () => {} };
  describe('unit test for all methods called when the component mounts', () => {
    let wrapper;
    beforeEach(() => {
      jest.spyOn(AddNewRoom.prototype, 'componentDidMount').mockImplementationOnce(() => true);
      wrapper = shallow(<AddNewRoom {...props} />);
    });
    afterEach(() => { wrapper.unmount(); });
    it('should set the state of locationId when setLocationId method is called', async () => {
      jest.spyOn(queryHelpers, 'getUserDetails').mockImplementationOnce(() => true);
      jest.spyOn(queryHelpers, 'getAllLocations').mockImplementationOnce(() => ({ find: () => ({ id: 'my-id' }) }));
      expect(wrapper.state('locationId')).toEqual('');
      await wrapper.instance().setLocationId();
      wrapper.update();
      expect(wrapper.state('locationId')).toEqual('my-id');
    });

    it('should set the state of levels when getLevels method is called', async () => {
      jest.spyOn(queryHelpers, 'getRoomsStructure').mockImplementationOnce(() => ({ allStructures: '' }));
      jest.spyOn(stripTypeNames, 'default').mockImplementationOnce(() => true);
      jest.spyOn(formatSetupData, 'default').mockImplementationOnce(() => ([{ children: [], tag: 'my-levels' }]));
      expect(wrapper.state('levels')).toEqual([]);
      await wrapper.instance().getLevels();
      wrapper.update();
      expect(wrapper.state('levels')).toEqual([{ children: [], tag: 'my-levels' }]);
    });

    it('should set the state of rooms when fetchRemoteRooms method is called', async () => {
      jest.spyOn(queryHelpers, 'getAllRemoteRooms').mockImplementationOnce(() => ({ rooms: ['my-room'] }));
      expect(wrapper.state('rooms')).toEqual([]);
      await wrapper.instance().fetchRemoteRooms();
      wrapper.update();
      expect(wrapper.state('rooms')).toEqual(['my-room']);
    });
    it('should set the state of roomsAllLocations when fetchRemoteRooms method is called', async () => {
      jest.spyOn(queryHelpers, 'getRemoteRoomsAllLocations').mockImplementationOnce(() => ({ rooms: ['new-room'] }));
      expect(wrapper.state('roomsAllLocations')).toEqual([]);
      await wrapper.instance().fetchRemoteRooms();
      wrapper.update();
      expect(wrapper.state('roomsAllLocations')).toEqual(['new-room']);
    });

    it('should toggle the value of isAllRemoteRooms in the state when handleClick method is called', () => {
      expect(wrapper.state('isAllRemoteRooms')).toEqual(false);
      wrapper.instance().handleClick();
      expect(wrapper.state('isAllRemoteRooms')).toEqual(true);
    });
  });
  it('should capitalize the first letter of a string when capitalizeFirstLetter method is called', () => {
    const addNewRoomInstance = new AddNewRoom();
    const expectedString = 'Ademola';
    const result = addNewRoomInstance.capitalizeFirstLetter('ademola');
    expect(result).toBe(expectedString);
  });
  it('should set the state of files, imageUrl, and thumbnailName when updateThumbnailState method is called', () => {
    const wrapper = shallow(<AddNewRoom {...props} />);
    expect(wrapper.state('thumbnailName')).toEqual('Upload a thumbnail');
    expect(wrapper.state('files')).toEqual([]);
    expect(wrapper.state('imageUrl')).toEqual('');
    wrapper.instance().updateThumbnailState(['demola\'s-files'], 'demola\'s-imageURl', 'demola\'s thumbnail');
    expect(wrapper.state('thumbnailName')).toEqual('demola\'s thumbnail');
    expect(wrapper.state('files')).toEqual(['demola\'s-files']);
    expect(wrapper.state('imageUrl')).toEqual('demola\'s-imageURl');
  });
  it('should re-initialize the state of imageUrl and thumbnailName when handleCloseModal method is called', () => {
    const wrapper = shallow(<AddNewRoom {...props} />);
    wrapper.setState({ imageUrl: 'my-image', thumbnailName: 'my-thumbnail' });
    wrapper.update();
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('thumbnailName')).toEqual('Upload a thumbnail');
    expect(wrapper.state('imageUrl')).toEqual('');
  });
  it('isValidEntry should return true when any field required to create a room is not empty', () => {
    const wrapper = shallow(<AddNewRoom {...props} />);
    const stateValues = {
      rooms: 'room',
      remoteRoomName: 'remoteRoomName',
      roomName: 'roomName',
      roomType: 'roomType',
      levelInput: 'levelInput',
      locationId: 'locationId',
      files: 'files',
      roomCapacity: 'roomCapacity',
    };
    expect(wrapper.instance().isValidEntry(stateValues)).toBe(true);
  });
  it('isValidEntry should return false when any field required to create a room is empty', () => {
    const wrapper = shallow(<AddNewRoom {...props} />);
    const stateValues = {
      rooms: '',
      remoteRoomName: 'remoteRoomName',
      roomName: 'roomName',
      roomType: 'roomType',
      levelInput: 'levelInput',
      locationId: 'locationId',
      files: 'files',
      roomCapacity: 'roomCapacity',
    };
    expect(wrapper.instance().isValidEntry(stateValues)).toBe(false);
  });
  it('should render a modal when when the component mounts', () => {
    const wrapper = shallow(<AddNewRoom {...props} />);
    expect(wrapper.find('MrmModal').length).toBe(1);
  });
});
