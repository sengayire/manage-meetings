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
    query: jest.fn(),
  };

  const mockedClient2 = {
    readQuery: jest
      .fn()
      .mockImplementationOnce(() => allRooms),
    query: jest.fn(),
  };

  beforeEach(async () => {
    const response1 = await getUserDetails(mockedClient1);
    await getRoomList(response1.location, 8, 1, mockedClient2);
    wrapper = await mount(<RoomSetup />);
    jest.spyOn(CookieHelper, 'decodeTokenAndGetUserData').mockImplementationOnce(() => ({
      UserInfo: {
        userData: {
          firstName: 'Bill',
        },
      },
    }));
    jest.spyOn(wrapper.instance(), 'fetchRooms').mockImplementationOnce(() => allRooms);
  });

  it('should render the spinner when fetching data and error when no data is found', () => {
    expect(wrapper.find('.spinner').length).toBe(1);
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
