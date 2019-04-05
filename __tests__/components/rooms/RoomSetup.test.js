import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import RoomsSetup, { RoomSetup } from '../../../src/components/rooms/RoomSetup';
import { request, initProps, result, mockedClient, user } from '../../../__mocks__/roomSetup';

describe('Unit test for room setup Component', () => {
  const wrappedRoomSetup = (
    <MockedProvider
      mocks={[
        { request, result },
      ]}
      addTypename={false}
    >
      <RoomsSetup {...initProps} client={mockedClient} />
    </MockedProvider>
  );

  it('should have rooms', async () => {
    const wrapper = mount(wrappedRoomSetup);
    const roomSetup = wrapper.find('RoomSetup');
    jest.spyOn(roomSetup.instance(), 'getUserLocation').mockImplementation(() => user);
    roomSetup.setState({
      allRooms: result.data.allRooms,
      location: 'Lagos',
    });
    await wait();
    wrapper.update();
    const roomsLength = roomSetup.state().allRooms.rooms.length;
    expect(roomsLength).toBe(5);
  });

  it('should render the setup page without the navbar', () => {
    const wrapper = shallow(<RoomSetup {...initProps} client={mockedClient} />);
    expect(wrapper.find('.setup-navbar').exists()).toBe(false);
  });

  it('should handle fetchRooms function', () => {
    const props = {
      data: {
        fetchMore: jest.fn(() => Promise.resolve()),
        updateQuery: jest.fn(),
        allRooms: {
          rooms: [],
        },
        variables: {
          page: 1,
          perPage: 8,
          capacity: 0,
          location: 'Lagos',
          office: '',
        },
      },
    };
    const wrapper = mount(<RoomSetup {...props} client={mockedClient} />);
    expect(wrapper.instance().fetchRooms(8, 1));
  });

  it('should render the setup page correctly', () => {
    const wrapper = shallow(<RoomSetup {...initProps} client={mockedClient} />);
    wrapper.setState({
      location: 'Lagos',
    });
    expect(wrapper.find('.setup-container').exists()).toBe(true);
    expect(wrapper.find('.room-select-input').children().length).toBe(3);
  });

  it('should render the error component when there is no data returned', () => {
    const props = {
      data: {
        error: { graphQLErrors: [{ message: 'No resource found' }] },
        fetchMore: jest.fn(() => Promise.resolve()),
        updateQuery: jest.fn(),
        allRooms: {
          rooms: [],
        },
        variables: {
          page: 1,
          perPage: 8,
        },
      },
    };
    const component = shallow(<RoomSetup {...props} />);
    expect(component.find('ErrorIcon').exists()).toBe(true);
  });
});
