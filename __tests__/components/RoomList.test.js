import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import {
  GET_ROOMS_QUERY,
  GET_LOCATIONS_QUERY,
} from '../../src/graphql/queries/Rooms';
import allRooms, { roomLocations } from '../../__mocks__/rooms/Rooms';
import RoomsLists, { RoomsList } from '../../src/components/RoomsList';

describe('RoomList Component', () => {
  const request = {
    query: GET_ROOMS_QUERY,
    variables: {
      page: 1,
      perPage: 5,
    },
  };
<<<<<<< HEAD
  const props = {
    data: {
      fetchMore: jest.fn(),
      allRooms: {
        rooms: [],
      },
    },
    locations: {
      allLocations: [{
        id: 2,
        name: 'Kampala',
      }],
      error: {
        locationError: {
          message: 'error',
        },
      },
    },
    loading: false,
    error: undefined,
  };
  const initProps = {
    data: {
      fetchMore: jest.fn(),
      allRooms: {
        rooms: [],
      },
    },
    locations: {
      allLocations: [{
        id: 2,
        name: 'Kampala',
      }],
    },
    loading: false,
    error: undefined,
  };
=======
>>>>>>> chore(delete user): Admin should not be able to delete users (#80)
  const result = { ...allRooms };
  const roomLocationsRequest = { query: GET_LOCATIONS_QUERY };
  const locationsResult = { data: { allLocations: [...roomLocations] } };
  const error = 'Something Went Wrong';

  const wrapperCode = (
    <MockedProvider
      mocks={[
        { request, result },
        { request: roomLocationsRequest, result: locationsResult },
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

  it('should render loading screen', () => {
    const wrapper = mount(wrapperCode);
    expect(wrapper.find('RoomsList').props().data.loading).toBe(true);
  });

  it('should render an error screen', async () => {
    const errorWrapper = (
      <MockedProvider mocks={[{ request, error }]} addTypename>
        <RoomsLists />
      </MockedProvider>
    );

    const wrapper = mount(errorWrapper);

    // check whether there is no error during when a loading
    expect(wrapper.find('RoomsList').props().data.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    // check whether an error occurs after loading
    expect(wrapper.find('RoomsList').props().data.error).toBeTruthy();
    // expect(wrapper.find('RoomsList').props().data.error.networkError).toBe(error);
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

    await new Promise(resolve => setTimeout(resolve));
    errorWrapper.update();
    expect(errorWrapper.find('RoomsList').props().locations.error).toBeTruthy();
    expect(errorWrapper.find('RoomsList').props().locations.error.networkError).toBe(error);
  });

  it('handles the error in component', () => {
    const wrapper = shallow(<RoomsList {...props} />);
    wrapper.setState({
      allRooms: {
        rooms: [],
      },
      noResoure: false,
    });
    expect(wrapper.instance().handleNoResource());
  });
});
