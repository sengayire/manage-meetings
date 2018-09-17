import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_PEOPLE_QUERY, GET_ROLES_QUERY } from '../../../src/graphql/queries/People';
import { GET_LOCATIONS_QUERY } from '../../../src/graphql/queries/Rooms';
import allPeople from '../../../__mocks__/people/People';
import allRoles from '../../../__mocks__/people/Roles';
import allLocations from '../../../__mocks__/offices/Locations';
import PeopleList from '../../../src/components/people/PeopleList';

describe('PeopleList Component', () => {
  const error = new Error('Something Went Wrong');
  const mocks = [
    { request: { query: GET_PEOPLE_QUERY }, result: { ...allPeople } },
    { request: { query: GET_ROLES_QUERY }, result: { ...allRoles } },
    { request: { query: GET_LOCATIONS_QUERY }, result: { ...allLocations } },
  ];
  const wrapper = (
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <PeopleList />
    </MockedProvider>
  );

  it('renders correctly from memory', () => {
    const mountWrapper = mount(wrapper);
    expect(mountWrapper).toMatchSnapshot();
  });

  it('should render loading screen', () => {
    const mountWrapper = mount(wrapper);
    expect(mountWrapper.find('PeopleList').props().data.loading).toBe(true);
    expect(mountWrapper.find('PeopleList').props().roles.loading).toBe(true);
    expect(mountWrapper.find('PeopleList').props().locations.loading).toBe(true);
  });

  it('should render an error screen on failed querying people', async () => {
    const errorMocks = [
      {
        request: { query: GET_PEOPLE_QUERY },
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
        <PeopleList />
      </MockedProvider>
    );
    const mountErrorWrapper = mount(errorWrapper);

    // check whether there is no error during when a loading
    expect(mountErrorWrapper.find('PeopleList').props().data.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));
    mountErrorWrapper.update();
    // check whether an error occurs after loading
    expect(mountErrorWrapper.find('PeopleList').props().data.error).toBeTruthy();
    expect(mountErrorWrapper.find('PeopleList').props().data.error.networkError).toBe(error);
  });

  it('should render an error screen on failed querying roles', async () => {
    const errorMocks = [
      {
        request: { query: GET_PEOPLE_QUERY },
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
        <PeopleList />
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
        request: { query: GET_PEOPLE_QUERY },
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
        <PeopleList />
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
        <PeopleList />
      </MockedProvider>
    );
    const mountResolveWrapper = mount(resolvedWrapper);

    await new Promise(resolve => setTimeout(resolve));
    mountResolveWrapper.update();
    expect(mountResolveWrapper.find('PeopleList')).toHaveLength(1);
    expect(mountResolveWrapper.find('PeopleList').prop('data').users.users.length).toEqual(allPeople.data.users.users.length);
    expect(mountResolveWrapper.find('PeopleList').prop('locations').allLocations.length).toEqual(allLocations.data.allLocations.length);
    expect(mountResolveWrapper.find('PeopleList').prop('roles').roles.length).toEqual(allRoles.data.roles.length);
  });
});
