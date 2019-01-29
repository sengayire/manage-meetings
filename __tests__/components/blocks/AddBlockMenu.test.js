import React from 'react';
import { shallow } from 'enzyme';
import { AddBlockMenu } from '../../../src/components/blocks/AddBlockMenu';

const offices = {
  offices: [
    { name: 'Dojo 1', id: 1, location: { name: 'Nairobi' } },
    { name: 'Dojo 3', id: 2, location: { name: 'Nairobi' } },
  ],
};
const user = {
  user: {
    location: 'Nairobi',
    loading: false,
  },
};

describe('AddBlockMenu Component', () => {
  const wrapper = shallow(<AddBlockMenu offices={offices} user={user} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have add-block-menu ', () => {
    const addMenu = wrapper.find('.add-block-menu');
    expect(addMenu).toHaveLength(1);
  });

  it('should display a list of offices in the dropdown', () => {
    const addMenuList = wrapper.find('.add-block-menu-list');
    expect(addMenuList).toHaveLength(1);
  });
});
