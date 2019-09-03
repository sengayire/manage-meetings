import React from 'react';
import { shallow, mount } from 'enzyme';
import SetupNavbar from '../../../src/components/setup/SetupNavbar';

describe('Unit test for setup nav bar', () => {
  let props = {
    handleSelectedItem: jest.fn(),
    currentNavItem: 'rooms',
  };
  const wrapper = shallow(<SetupNavbar {...props} />);

  it('should render the setup navbar correctly', () => {
    expect(wrapper.find('.setup-navbar').exists()).toBe(true);
    expect(wrapper.find('.setup-navbar').children().length).toBe(5);
  });

  it('should render Devices when currentNavItem is equal to devices', () => {
    props = {
      handleSelectedItem: jest.fn(),
      currentNavItem: 'devices',
    };
    const deviceswrapper = mount(<SetupNavbar {...props} />);
    expect(deviceswrapper.find('#devices').exists()).toBe(true);
  });
});
