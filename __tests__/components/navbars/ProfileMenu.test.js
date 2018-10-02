import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileMenu from '../../../src/components/navbars/ProfileMenu';

describe('ProfileMenu', () => {
  const wrapper = mount(<Router><ProfileMenu /></Router>);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have two menu item', () => {
    const list = wrapper.find('li');
    expect(list).toHaveLength(2);
  });

  it('should respond to click events properly', () => {
    window.location.reload = jest.fn();
    const list = wrapper.find('li').last();
    list.simulate('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
