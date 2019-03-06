import React from 'react';
import { shallow } from 'enzyme';
import { ApolloError } from 'apollo-client';
import People from '../../../src/components/people/People';

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

  const wrapper = shallow(<People
    people={person}
    refetch={jest.fn()}
    allRoles={allRoles}
    editRole={editRole}
    currentPage={1}
  />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain role menu', () => {
    const iconBtn = wrapper.find('ThemedIconMenu');
    expect(iconBtn.length).toEqual(1);
    iconBtn.simulate('click');
    const iconMenu = wrapper.find('ThemedThemed');
    expect(iconMenu.length).toEqual(2);
  });

  it('should change role succesfully', () => {
    const iconMenu = wrapper.find('ThemedThemed').at(1);
    iconMenu.simulate('click');
    expect(editRole).toBeCalled();
    expect(editRole).toBeCalledWith({ variables: { email: person.email, roleId: 2 } });
  });

  it('should return an error when changing role', () => {
    wrapper.setProps({
      editRole: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('error')] }))),
    });
    const iconMenu = wrapper.find('ThemedThemed').at(1);
    iconMenu.simulate('click');
    expect(editRole).toBeCalled();
    expect(editRole).toBeCalledWith({ variables: { email: person.email, roleId: 2 } });
  });
});
