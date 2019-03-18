import React from 'react';
import { shallow } from 'enzyme';
import SetupNavbar from '../../../src/components/setup/SetupNavbar';

describe('Unit test for setup nav bar', () => {
  const props = {
    handelSelectedItem: jest.fn(),
  };
  const event = {
    currentTarget: {
      id: 'resources',
    },
  };
  const wrapper = shallow(<SetupNavbar {...props} />);

  it('should render the setup navbar correctly', () => {
    expect(wrapper.find('.setup-navbar').exists()).toBe(true);
    expect(wrapper.find('.setup-navbar').children().length).toBe(5);
  });

  it('should toggle navbar item when user clicks on it', () => {
    const navItem = wrapper.find('#resources');
    expect(wrapper.state().currentNavItem).toBe('meeting-rooms');
    navItem.simulate('click', event);
    expect(wrapper.state().currentNavItem).toBe('resources');
  });
});

