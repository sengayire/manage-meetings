import React from 'react';
import { shallow } from 'enzyme';
import People from '../../../src/components/people/People';

describe('People Component', () => {
  const person = {
    name: 'Edward Barton',
    location: 'Nairobi',
    accessLevel: 'Admin',
    picture: 'http://no-url',
  };
  const allRoles = [
    { id: 1, role: 'Admin' },
    { id: 2, role: 'Default User' },
  ];
  const wrapper = shallow(<People people={person} allRoles={allRoles} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
