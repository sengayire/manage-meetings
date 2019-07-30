import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloError } from 'apollo-client';
import People from '../../../src/components/people/People';
import allLocations from '../../../__mocks__/offices/Locations';
import * as queryHelper from '../../../src/components/helpers/QueriesHelpers';
import * as mutationHelper from '../../../src/components/helpers/mutationHelpers/people';

jest.mock('../../../src/components/helpers/QueriesHelpers');
jest.mock('../../../src/components/helpers/mutationHelpers/people');

queryHelper.getAllLocationsFromCache.mockReturnValue(allLocations.data.allLocations);

describe('People Component', () => {
  const result = { data: { email: 'test@email.com', id: 1 } };
  const person = {
    name: 'Edward Barton',
    email: 'edward.barton@andela.com',
    location: 'Nairobi',
    accessLevel: 'Admin',
    picture: 'http://no-url',
  };
  const allRoles = [
    { id: 1, role: 'Admin' },
    { id: 2, role: 'Default User' },
  ];
  const editRole = jest.fn(() => Promise.resolve(result));
  const refetch = jest.fn(() => Promise.resolve(result));

  let spy;

  const wrapper = mount(
    <MockedProvider addTypename={false}>
      <People
        allLocations={allLocations}
        people={person}
        refetch={refetch}
        allRoles={allRoles}
        editRole={editRole}
        currentPage={1}
        perPage={3}
      />
    </MockedProvider>,
  );


  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain role menu', async () => {
    const iconBtn = wrapper.find('ThemedIconMenu');
    expect(iconBtn.length).toEqual(2);
    iconBtn.last().simulate('click');
    const iconMenu = wrapper.find('ThemedThemed');
    expect(iconMenu.length).toEqual(7);
  });

  it('should change role succesfully', () => {
    const iconMenu = wrapper.find('ThemedThemed').at(6);
    iconMenu.simulate('click');
    expect(editRole).toBeCalled();
    expect(editRole).toBeCalledWith({ variables: { email: person.email, roleId: 2 } });
  });

  it('should call change location function', () => {
    const iconMenu = wrapper.find('ThemedThemed').at(3);
    iconMenu.simulate('click');
    spy = jest.spyOn(mutationHelper, 'changeUserLocation').mockImplementationOnce(() => ({}));
    expect(spy).toBeCalled();
    expect(refetch).toBeCalled();
  });

  it('should return an error when changing role', () => {
    wrapper.setProps({
      editRole: jest.fn(() => Promise.reject(new ApolloError(
        { graphQLErrors: [new Error('error')] }))),
    });
    const iconMenu = wrapper.find('ThemedThemed').at(6);
    iconMenu.simulate('click');
    expect(editRole).toBeCalled();
    expect(editRole).toBeCalledWith({ variables: { email: person.email, roleId: 2 } });
  });
});
