import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ProfileMenu from '../../../src/components/navbars/ProfileMenu';

describe('ProfileMenu', () => {
  const wrapper = mount(<MemoryRouter><ProfileMenu /></MemoryRouter>);

  it('should have a dropdown', () => {
    const list = wrapper.find('Dropdown');
    expect(list).toHaveLength(1);
  });

  it('Profile menu renders correctly', () => {
    const wrapper2 = shallow(<MemoryRouter><ProfileMenu /></MemoryRouter>);
    expect(wrapper2).toMatchSnapshot();
  });
});
