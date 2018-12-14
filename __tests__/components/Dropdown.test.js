import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../src/components/commons/Dropdown';

describe('Sort Component', () => {
  const props = {
    content: `
      <div>
      <span>Rooms</span>
      <span>Wings</span>
      </div>
    `,
  };
  const wrapper = shallow(<Dropdown {...props} />);

  it('should render component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should only display button without content', () => {
    expect(wrapper.find('.dropdown-menu').length).toBe(0);
    expect(wrapper.state().isVisible).toBe(false);
  });

  it('should content when the toggle icon is clicked', () => {
    wrapper.find('.dropdown-caret button').simulate('click');
    expect(wrapper.find('.dropdown-menu').length).toBe(1);
    expect(wrapper.state().isVisible).toBe(true);
  });
});
