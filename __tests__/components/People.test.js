import React from 'react';
import { shallow } from 'enzyme';
import People from '../../src/components/People';

describe('People Component', () => {
  const person = {
    name: 'Edward Barton',
    location: 'Nairobi',
    accessLevel: 'Administrator',
  };
  const wrapper = shallow(<People people={person} />);
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
