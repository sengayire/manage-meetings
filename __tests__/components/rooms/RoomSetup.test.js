import React from 'react';
import { mount } from 'enzyme';
import RoomSetup from '../../../src/components/rooms/RoomSetup';
import { getUserDetails, getRoomList } from '../../../src/components/helpers/QueriesHelpers';
import allRooms from '../../../__mocks__/rooms/Rooms';
import { result } from '../../../__mocks__/roomSetup';
import * as CookieHelper from '../../../src/utils/Cookie';

describe('Unit test for room setup Component', () => {
  let wrapper;
  const mockedClient1 = {
    readQuery: jest.fn().mockImplementationOnce(() => ({ user: { email: 'converge@andela.com' } })),
    query: jest.fn(() => ({ data: { user: {} } })),
  };

  const mockedClient2 = {
    readQuery: jest.fn().mockResolvedValue(() => allRooms),
    query: jest.fn(() => ({ data: 'rooms' })),
  };

  beforeEach(async () => {
    jest.spyOn(CookieHelper, 'decodeTokenAndGetUserData').mockImplementationOnce(() => ({
      UserInfo: {
        userData: {
          firstName: 'Bill',
        },
      },
    }));
    const response1 = await getUserDetails(mockedClient1);
    await getRoomList(response1.location, 8, 1, mockedClient2);
    wrapper = await mount(<RoomSetup />);
    jest.spyOn(wrapper.instance(), 'fetchRooms').mockImplementationOnce(() => allRooms);
  });
  it('should render the spinner when fetching data', () => {
    expect(wrapper.find('.spinner').length).toBe(1);
  });

  it('should render the error component when no data is found', () => {
    wrapper.setState({
      error: true,
      isFetching: false,
    });
    expect(wrapper.find('ErrorIcon').length).toBe(1);
  });

  it('should render the meeting rooms page correctly', () => {
    wrapper.setState({
      location: 'Lagos',
      allRooms: result,
      dataFetched: true,
      isFetching: false,
    });
    expect(wrapper.find('.room-details-container').length).toBe(5);
    expect(wrapper.find('.setup-container').exists()).toBe(true);
    expect(wrapper.find('.room-select-input').children().length).toBe(3);
  });
});

describe('', () => {
  const wrapper = mount(<RoomSetup />);
  it('should update the allRooms state', () => {
    const rooms = {
      roomName: 'test room',
    };
    wrapper.setState({
      allRooms: {},
    });
    const updateRoomDataSpy = jest.spyOn(wrapper.instance(), 'updateRoomData');
    wrapper.instance().updateRoomData(rooms);
    wrapper.update();
    expect(updateRoomDataSpy).toHaveBeenCalled();
  });
});
