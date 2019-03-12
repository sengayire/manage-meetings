import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import {
  GET_ROOMS_QUERY,
  GET_LOCATIONS_QUERY,
  GET_ROOM_BY_NAME,
} from '../../../src/graphql/queries/Rooms';
import allRooms, {
  roomLocations,
  getRoomByNameData,
} from '../../../__mocks__/rooms/Rooms';
import RoomsLists, { RoomsList } from '../../../src/components/rooms/RoomsList';
import ErrorIcon from '../../../src/components/commons/ErrorIcon';

describe('RoomList Component', () => {
  const request = {
    query: GET_ROOMS_QUERY,
    variables: {
      page: 1,
      perPage: 5,
    },
  };

  const getRoomByNameRequest = {
    query: GET_ROOM_BY_NAME,
    variables: {
      name: 'Kampala',
    },
  };

  const initProps = {
    data: {
      fetchMore: jest.fn(() => Promise.resolve()),
      allRooms: {
        rooms: [],
      },
      variables: {
        page: 1,
        perPage: 5,
      },
    },
    allRooms: {
      rooms: [],
    },
    locations: {
      allLocations: [
        {
          id: 2,
          name: 'Kampala',
        },
      ],
    },
    getRoomByName: {
      fetchMore: jest.fn(() => Promise.resolve()),
      updateQuery: jest.fn(),
    },
    loading: false,
    error: undefined,
  };
  const result = { ...allRooms };
  const roomLocationsRequest = { query: GET_LOCATIONS_QUERY };
  const locationsResult = { data: { allLocations: [...roomLocations] } };
  const error = 'Something Went Wrong';

  const wrapperCode = (
    <MockedProvider
      mocks={[
        { request, result, getRoomByNameRequest },
        { request: roomLocationsRequest, result: locationsResult },
        { request: getRoomByNameRequest, result: getRoomByNameData },
      ]}
      addTypename={false}
    >
      <RoomsLists />
    </MockedProvider>
  );

  const locationErrorWrapper = (
    <MockedProvider
      mocks={[{ request, result }, { request: roomLocationsRequest, error }]}
      addTypename
    >
      <RoomsLists />
    </MockedProvider>
  );

  it('renders correctly from memory', () => {
    expect(mount(wrapperCode)).toMatchSnapshot();
  });

  it('handles handleNoResource functions', () => {
    const wrapper = shallow(<RoomsList {...initProps} />);
    wrapper.setState({
      allRooms: {
        rooms: [],
      },
      noResoure: false,
    });

    expect(wrapper.instance().handleData(5, 1));
    expect(wrapper.instance().handleNoResource());
  });
  it('handles handleResource function', () => {
    const wrapper = shallow(<RoomsList {...initProps} />);
    wrapper.setState({
      allRooms: {
        rooms: [],
      },
      noResoure: true,
    });

    expect(wrapper.instance().handleResource());
    expect(wrapper.instance().handleSetState('Kampala', 0, 'Lagos'));
    expect(wrapper.instance().handleResetState());
  });

  it('handles startSearching function', () => {
    const wrapper = shallow(<RoomsList {...initProps} />);
    expect(wrapper.instance().startSearching('kampala'));
    expect(initProps.data.fetchMore).toBeCalled();
  });

  it('handles stopSearching function', () => {
    const wrapper = shallow(<RoomsList {...initProps} />);
    expect(wrapper.instance().stopSearching());
  });

  it('calls handleSearchData function', () => {
    const wrapper = shallow(<RoomsList {...initProps} />);
    const searchedData = [];
    expect(wrapper.instance().handleSearchData(searchedData));
  });

  it('should render loading screen', () => {
    const wrapper = mount(wrapperCode);
    expect(wrapper.find('RoomsList').props().data.loading).toBe(true);
  });

  it('should render an error screen', async () => {
    const errorWrapper = (
      <MockedProvider mocks={[{ request, error }]} addTypename={false}>
        <RoomsLists />
      </MockedProvider>
    );

    const wrapper = mount(errorWrapper);

    // check whether there is no error during when a loading
    expect(wrapper.find('RoomsList').props().data.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(ErrorIcon)).toHaveLength(1);
    // check whether an error occurs after loading
    expect(wrapper.find('RoomsList').props().data.error).toBeTruthy();
  });

  it('should should pass the allRooms and locations props to the contained element', async () => {
    const wrapper = mount(wrapperCode);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find('RoomsList')).toHaveLength(1);
    expect(wrapper.find('RoomsList').prop('locations').allLocations.length).toEqual(roomLocations.length);
  });

  it('should render an error on failure to load locations', async () => {
    const errorWrapper = mount(locationErrorWrapper);
    await wait(0);
    errorWrapper.update();
    expect(errorWrapper.find('RoomsList').props().locations.error).toBeTruthy();
    expect(errorWrapper.find('RoomsList').props().locations.error.networkError).toBe(error);
  });

  it('handles the error in component', () => {
    const wrapper = shallow(<RoomsList {...initProps} />);

    wrapper.setState({
      allRooms: {
        rooms: [],
      },
      noResoure: false,
    });
    expect(wrapper.instance().handleNoResource());
  });

  it('renders the locationsError error', async () => {
    const locationError = (
      <MockedProvider
        mocks={[{ request: roomLocationsRequest, error }]}
        addTypename={false}
      >
        <RoomsLists />
      </MockedProvider>
    );
    const wrapper = mount(locationError);
    await wait(0);
    wrapper.update();
    expect(wrapper.find('RoomsList').props().locations.error).toBeTruthy();
    expect(wrapper.find(ErrorIcon)).toHaveLength(1);
  });

  it('should render the DataNotFound component when there is no data in the database', () => {
    const props = {
      data: {
        error: { message: 'GraphQL error: No more resources' },
        fetchMore: jest.fn(() => Promise.resolve()),
        allRooms: {
          rooms: [],
        },
        variables: {
          page: 1,
          perPage: 5,
        },
      },
      allRooms: {
        rooms: [],
      },
      locations: {
        allLocations: [
          {
            id: 2,
            name: 'Kampala',
          },
        ],
      },
      getRoomByName: {
        fetchMore: jest.fn(() => Promise.resolve()),
        updateQuery: jest.fn(),
      },
    };
    const component = shallow(<RoomsList {...props} />);
    expect(component.find('DataNotFound')).toBeTruthy();
  });
});
