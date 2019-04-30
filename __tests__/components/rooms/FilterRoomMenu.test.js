import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import {
  GET_ROOMS_QUERY,
  GET_LOCATIONS_QUERY,
} from '../../../src/graphql/queries/Rooms';
import { GET_ALL_OFFICES } from '../../../src/graphql/queries/Offices';
import allRooms, { roomLocations } from '../../../__mocks__/rooms/Rooms';
import { officeDetails } from '../../../__mocks__/offices/Offices';

import FilterRoomMenu, { FilterButton } from '../../../src/components/rooms/FilterRoomMenu';

describe('FilterButton', () => {
  const initProps = {
    page: 1,
    perPage: 2,
    isResource: jest.fn(),
    isNoResource: jest.fn(),
    handleSetState: jest.fn(),
    handleResetState: jest.fn(),
    isSearching: jest.fn(),
    stopSearching: jest.fn(),
    offices: {
      allOffices: {
        offices: [],
      },
    },
    locations: {
      allLocations: [],
    },
    data: {
      allRooms: {
        rooms: [],
      },
      fetchMore: jest.fn(() => Promise.resolve()),
    },
  };
  let wrapper = mount(<FilterButton {...initProps} />);
  wrapper.setState({
    roomCapacity: 0,
    office: '',
    location: '',
    search: '',
  });
  const event = {
    target: {
      name: 'location',
      value: 'Kampala',
    },
  };
  const request = {
    query: GET_ROOMS_QUERY,
    variables: {
      page: 1,
      perPage: 5,
    },
  };
  const result = { ...allRooms };
  const roomLocationsRequest = { query: GET_LOCATIONS_QUERY };
  const officeRequest = {
    query: GET_ALL_OFFICES,
    variables: {
      page: 1,
      perPage: 5,
    },
  };
  const locationsResult = { data: { allLocations: [...roomLocations] } };
  const officeResult = { ...officeDetails };

  const wrapperCode = (
    <MockedProvider
      mocks={[
        { request, result },
        { request: roomLocationsRequest, result: locationsResult },
        { request: officeRequest, result: officeResult },
      ]}
      addTypename={false}
    >
      <FilterRoomMenu {...initProps} />
    </MockedProvider>
  );

  it('renders correctly from memory', () => {
    expect(mount(wrapperCode)).toMatchSnapshot();
  });

  it('should handle the hanldeClear function', () => {
    expect(wrapper.instance().handleClear());
    expect(wrapper.instance().handleInputChange(event, 0));
  });

  it('should handle the handleFormInputChange function on resovle', () => {
    expect(wrapper.instance().handleInputChange(event, 0));
    expect(initProps.data.fetchMore).toBeCalled();
  });

  it('should call the handleSearch function', () => {
    const eventForSearch = {
      target: {
        name: 'search',
        value: 'Kampala',
      },
    };
    expect(wrapper.instance().handleSearch(eventForSearch, 0));
  });

  it('should handle Search for an empty input', () => {
    const eventForSearch = {
      target: {
        name: 'search',
        value: '',
      },
    };
    expect(wrapper.instance().handleSearch(eventForSearch, 0));
  });

  it('should have handleClose for filter menu', () => {
    expect(wrapper.instance().handleClose());
  });

  it('should handle the handleFormInputChange function on reject', () => {
    const props = {
      isResource: jest.fn(),
      isNoResource: jest.fn(),
      handleSetState: jest.fn(),
      handleResetState: jest.fn(),
      isSearching: jest.fn(),
      stopSearching: jest.fn(),
      offices: {
        allOffices: {
          offices: [
            { id: 1, name: 'The Crest', location: { name: 'Kampala' } },
          ],
        },
      },
      locations: {
        allLocations: [{ id: 1, name: 'Kampala' }],
      },
      data: {
        allRooms: {
          rooms: [],
        },
        fetchMore: jest.fn(() => Promise.reject()),
        updateQuery: jest.fn(),
      },
    };
    wrapper = mount(<FilterButton {...props} />);
    wrapper.setState({
      roomCapacity: 0,
      office: '',
      location: '',
      search: '',
    });
    expect(wrapper.instance().handleInputChange(event));
    expect(props.data.fetchMore).toBeCalled();
  });
});
