import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_PEOPLE_QUERY, GET_ROLES_QUERY } from '../../../src/graphql/queries/People';
import { GET_LOCATIONS_QUERY } from '../../../src/graphql/queries/Rooms';
import allPeople from '../../../__mocks__/people/People';
import allRoles from '../../../__mocks__/people/Roles';
import allLocations from '../../../__mocks__/offices/Locations';
import PeopleLists, { PeopleList } from '../../../src/components/people/PeopleList';
import { getUserLocation } from '../../../src/components/helpers/QueriesHelpers';


jest.mock('../../../src/components/helpers/QueriesHelpers');

getUserLocation.mockReturnValue({
  id: 1, name: 'Lagos',
});


const mocks = [
  {
    request: {
      query: GET_PEOPLE_QUERY,
      variables: {
        page: 1,
        perPage: 5,
        locationId: 0,
        roleId: 0,
      },
    },
    result: { ...allPeople },
  },
  { request: { query: GET_ROLES_QUERY }, result: { ...allRoles } },
  { request: { query: GET_LOCATIONS_QUERY }, result: { ...allLocations } },
];

const initProps = {
  people: {
    users: allPeople.data.users,
    fetchMore: jest.fn(() => Promise.resolve()),
    refetch: jest.fn(),
  },
  locations: {
    allLocations: {},
  },
  roles: {
    roles: [],
  },
  locationId: 0,
  editRole: jest.fn(),
};

const wrapper = (
  <MockedProvider
    mocks={mocks}
    addTypename={false}
  >
    <PeopleLists {...initProps} />
  </MockedProvider>
);
const mountWrapper = mount(wrapper);
const shallowWrapper = shallow(<PeopleList {...initProps} />);

describe('PeopleList Component', () => {
  const error = new Error('Something Went Wrong');

  it('renders correctly from memory', () => {
    expect(mountWrapper).toMatchSnapshot();
  });

  it('should render loading screen', () => {
    expect(mountWrapper.find('PeopleList').props().people.loading).toBe(true);
    expect(mountWrapper.find('PeopleList').props().roles.loading).toBe(true);
    expect(mountWrapper.find('PeopleList').props().locations.loading).toBe(true);
  });

  it('should render an error screen on failed querying people', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_PEOPLE_QUERY,
          variables: {
            page: 1,
            perPage: 5,
            locationId: 0,
            roleId: 0,
          },
        },
        error,
      },
      {
        request: { query: GET_ROLES_QUERY },
        result: { ...allRoles },
      },
      {
        request: { query: GET_LOCATIONS_QUERY },
        result: { ...allLocations },
      },
    ];
    const errorWrapper = (
      <MockedProvider
        mocks={errorMocks}
        addTypename={false}
      >
        <PeopleLists />
      </MockedProvider>
    );
    const mountErrorWrapper = mount(errorWrapper);

    // check whether there is no error during when a loading
    expect(mountErrorWrapper.find('PeopleList').props().people.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));
    mountErrorWrapper.update();
    // check whether an error occurs after loading
    expect(mountErrorWrapper.find('PeopleList').props().people.error).toBeTruthy();
  });

  it('should render an error screen on failed querying roles', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_PEOPLE_QUERY,
          variables: {
            page: 1,
            perPage: 5,
          },
        },
        result: { ...allPeople },
      },
      {
        request: { query: GET_ROLES_QUERY },
        error,
      },
      {
        request: { query: GET_LOCATIONS_QUERY },
        result: { ...allLocations },
      },
    ];
    const errorWrapper = (
      <MockedProvider
        mocks={errorMocks}
        addTypename={false}
      >
        <PeopleLists />
      </MockedProvider>
    );
    const mountErrorWrapper = mount(errorWrapper);
    // check whether there is no error during when a loading
    expect(mountErrorWrapper.find('PeopleList').props().roles.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));

    mountErrorWrapper.update();
    // check whether an error occurs after loading
    expect(mountErrorWrapper.find('PeopleList').props().roles.error).toBeTruthy();
    expect(mountErrorWrapper.find('PeopleList').props().roles.error.networkError).toBe(error);
  });

  it('should render an error screen on failed querying locations', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_PEOPLE_QUERY,
          variables: {
            page: 1,
            perPage: 5,
          },
        },
        result: { ...allPeople },
      },
      {
        request: { query: GET_ROLES_QUERY },
        result: { ...allRoles },
      },
      {
        request: { query: GET_LOCATIONS_QUERY },
        error,
      },
    ];
    const errorWrapper = (
      <MockedProvider
        mocks={errorMocks}
        addTypename={false}
      >
        <PeopleLists />
      </MockedProvider>
    );
    const mountErrorWrapper = mount(errorWrapper);

    // check whether there is no error during when a loading
    expect(mountErrorWrapper.find('PeopleList').props().locations.error).toBe(undefined);

    await new Promise(resolve => setTimeout(resolve));
    mountErrorWrapper.update();
    // check whether an error occurs after loading
    expect(mountErrorWrapper.find('PeopleList').props().locations.error).toBeTruthy();
    expect(mountErrorWrapper.find('PeopleList').props().locations.error.networkError).toBe(error);
  });

  it('should have all data passed as props', async () => {
    const resolvedWrapper = (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <PeopleLists />
      </MockedProvider>
    );
    const mountResolveWrapper = mount(resolvedWrapper);

    await new Promise(resolve => setTimeout(resolve));
    mountResolveWrapper.update();
    expect(mountResolveWrapper.find('PeopleList')).toHaveLength(1);
    expect(mountResolveWrapper.find('PeopleList').prop('locations').allLocations.length).toEqual(allLocations.data.allLocations.length);
    expect(mountResolveWrapper.find('PeopleList').prop('roles').roles.length).toEqual(allRoles.data.roles.length);
  });

  it('should have the sort component', async () => {
    await new Promise(resolve => setTimeout(resolve));
    mountWrapper.update();

    expect(mountWrapper.find('Sort').length).toEqual(1);
    expect(mountWrapper.find('Sort Dropdown').length).toEqual(1);
  });

  it('should display options using the dropdown menu component', () => {
    mountWrapper.find('Sort Dropdown .dropdown-caret button').simulate('mouseDown');
    expect(mountWrapper.find('.dropdown-menu').length).toEqual(1);
    expect(mountWrapper.find('.dropdown-menu span').length).toEqual(2);
    expect(mountWrapper.find('.dropdown-menu span').at(1).text()).toEqual('access');
    expect(mountWrapper.find('.dropdown-menu span').at(0).text()).toEqual('location');
  });

  // it('should display sub-options within the main option when the option is clicked', () => {
  //   expect(mountWrapper.find('.dropdown-menu span').at(0).hasClass('filter-options')).toBe(true);
  //   mountWrapper.find('.dropdown-menu span').at(0).simulate('click');
  //   expect(mountWrapper.find('.dropdown-menu span').at(0).hasClass('filter-options__disable')).
  //   toBe(true);
  //   expect(mountWrapper.find('.filter-options__children-list').length).toEqual(3);
  //   expect(mountWrapper.find('.filter-options__children-list').at(0).text()).toEqual('Kampala');
  //   expect(mountWrapper.find('.filter-options__children-list').at(1).text()).toEqual('Nairobi');
  //   expect(mountWrapper.find('.filter-options__children-list').at(2).text()).toEqual('Lagos');
  // });

  // it('should display options using the dropdown menu component', () => {
  //   expect(mountWrapper.find('.filter-options').length).toEqual(2);
  //   mountWrapper.find('.filter-options').at(1).simulate('click');
  //   expect(mountWrapper.find('.dropdown-menu span').at(1).hasClass('filter-options__disable'))
  // .toBe(true);
  //   expect(mountWrapper.find('.filter-options__children-list').length).toEqual(3);
  //   expect(mountWrapper.find('.filter-options__children-list').at(0).text()).
  //  toEqual('Default User');
  //   expect(mountWrapper.find('.filter-options__children-list').at(1).text()).toEqual('Admin');
  // });

  // it('should call sortPeople when any of the role sub-options is clicked', () => {
  //   const peopleWrapper = mountWrapper.find('PeopleList');
  //   const sortPeople = jest.spyOn(peopleWrapper.instance(), 'sortPeople');
  //   const fetchPeople = jest.spyOn(peopleWrapper.instance(), 'fetchPeople');

  //   peopleWrapper.find('.dropdown-caret button').simulate('click');
  //   peopleWrapper.find('.dropdown-menu span').at(1).simulate('click');
  //   peopleWrapper.find('.filter-options__children-list').at(0).simulate('click');

  //   expect(peopleWrapper.instance().state.optionName).toEqual('access');
  //   expect(peopleWrapper.instance().state.id).toEqual('1');
  //   expect(peopleWrapper.instance().state.hideDropdownMenu).toBe(true);
  //   expect(sortPeople).toHaveBeenCalledWith('access', '1');
  //   expect(fetchPeople).toHaveBeenCalledWith(3, 1, 'access', '1');

  //   sortPeople.mockRestore();
  //   fetchPeople.mockRestore();
  // });

  it(`should use value of optionName in state when fetchPeople is called without
      its argument is provided`, () => {
    shallowWrapper.instance().fetchPeople(1, 1);
    expect(initProps.people.fetchMore).toHaveBeenCalled();
  });

  it('should use value of optionName provided when fetchPeople is called', () => {
    shallowWrapper.instance().fetchPeople(1, 1, 'location', '2');
    expect(initProps.people.fetchMore).toHaveBeenCalledTimes(2);
  });

  it('should render the DataNotFound component when there is no data in the database', () => {
    const props = {
      people: {
        users: allPeople.data.users,
        fetchMore: jest.fn(() => Promise.resolve()),
        refetch: jest.fn(),
        error: { message: 'GraphQL error: No users found' },
      },
      locations: {
        allLocations: {},
      },
      roles: {
        roles: [],
      },
      editRole: jest.fn(),
    };
    const component = shallow(<PeopleList {...props} />);
    expect(component.find('DataNotFound')).toHaveLength(1);
  });
});
