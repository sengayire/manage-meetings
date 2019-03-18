import React from 'react';
import { shallow } from 'enzyme';
import RoomSetup from '../../src/containers/RoomSetup';

describe('Unit test for room setup Component', () => {
  const wrapper = shallow(<RoomSetup />);

  it('should render the setup page without the navbar', () => {
    expect(wrapper.find('.setup-navbar').exists()).toBe(false);
  });

  it('should render the setup page correctly', () => {
    expect(wrapper.find('.setup-container').exists()).toBe(true);
    expect(wrapper.find('.room-setup-header').text()).toBe('EPIC Tower\'s Meeting Room (3)');
    expect(wrapper.find('.room-select-input').children().length).toBe(3);
    expect(wrapper.find('.room-setup-container').children().length).toBe(4);
  });
});

