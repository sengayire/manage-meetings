import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_PEOPLE_QUERY } from '../../src/graphql/queries/People';
import allPeople from '../../__mocks__/people/People';
import PeopleList from '../../src/components/PeopleList';

describe('PeopleList Component', () => {
  const request = { query: GET_PEOPLE_QUERY };
  const result = { ...allPeople };
  const error = 'Something Went Wrong';
  const wrapper = (
    <MockedProvider
      mocks={[{ request, result }]}
      addTypename
    >
      <PeopleList />
    </MockedProvider>
  );

  const mountWrapper = mount(wrapper);

  it('renders correctly from memory', () => {
    expect(mountWrapper).toMatchSnapshot();
  });

  it('should render loading screen', () => {
    expect(mountWrapper.find('PeopleList').props().data.loading).toBe(true);
  });

  it('should render an error screen', async () => {
    const errorWrapper = (
      <MockedProvider mocks={[{ request, error }]} addTypename>
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

  it('should have all data passed as props', async () => {
    await new Promise(resolve => setTimeout(resolve));
    mountWrapper.update();
    expect(mountWrapper.find('PeopleList')).toHaveLength(1);
    expect(mountWrapper.find('PeopleList').prop('data').users.users.length).toEqual(allPeople.data.users.users.length);
  });
});
