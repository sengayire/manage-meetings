import React from 'react';
import { shallow } from 'enzyme';
import SetupNavbar from '../../../src/components/setup/SetupNavbar';

describe('Unit test for setup nav bar', () => {
  const props = {
    handleSelectedItem: jest.fn(),
    currentNavItem: '',
  };
  const wrapper = shallow(<SetupNavbar {...props} />);

  it('should render the setup navbar correctly', () => {
    expect(wrapper.find('.setup-navbar').exists()).toBe(true);
    expect(wrapper.find('.setup-navbar').children().length).toBe(5);
  });
});
