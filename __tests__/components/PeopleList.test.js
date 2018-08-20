import React from 'react';
import { mount } from 'enzyme';
import PeopleList from '../../src/components/PeopleList';

describe('PeopleList Component', () => {
  const wrapper = mount(<PeopleList />);
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
