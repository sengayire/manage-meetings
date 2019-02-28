import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileMenu from '../../../src/components/navbars/ProfileMenu';

describe('ProfileMenu', () => {
  const wrapper = mount(<Router><ProfileMenu /></Router>);

  it('should have a dropdown', () => {
    const list = wrapper.find('Dropdown');
    expect(list).toHaveLength(1);
  });

  it('should respond to click events properly and render the child components correctly', () => {
    window.location.reload = jest.fn();
    wrapper.find('.dropdown-caret button').simulate('mousedown', {
      type: 'focus',
    });
    const span = wrapper.find('button').last();
    span.simulate('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
