import React from 'react';
import { mount } from 'enzyme';
import RoomSetupView from '../../src/containers/RoomSetupView';

describe('unit test for room setupView component', () => {
  const wrapper = mount(<RoomSetupView />);

  it('should render the setup page complete with nav bar', () => {
    expect(wrapper.find('.setup-main-container').exists()).toBe(true);
    expect(wrapper.find('.setup-main-container').children().length).toBe(2);
    expect(wrapper.find('.setup-navbar').exists()).toBe(true);
    expect(wrapper.find('.setup-container').exists()).toBe(true);
  });
});

