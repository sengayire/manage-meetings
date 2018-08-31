import React from 'react';
import { mount } from 'enzyme';
import ProfileMenu from '../../../src/components/navbars/ProfileMenu';

describe('ProfileMenu', () => {
  const wrapper = mount(<ProfileMenu />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have one menu item', () => {
    const list = wrapper.find('li');
    expect(list).toHaveLength(1);
  });

  it('should respond to click events properly', () => {
    window.location.reload = jest.fn();
    const list = wrapper.find('li');
    list.simulate('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
