import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../../src/components/commons/Dropdown';

describe('Sort Component', () => {
  const props = {
    content: `
      <div>
      <span>Rooms</span>
      <span>Wings</span>
      </div>
    `,
  };

  const event = {
    preventDefault: jest.fn(),
    type: 'blur',
    target: {
      contains: jest.fn(),
      relatedTarget: '',
    },
  };
  const wrapper = shallow(<Dropdown {...props} />);

  it('should render component without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should only display button without content', () => {
    expect(wrapper.find('.dropdown-menu').length).toBe(0);
    expect(wrapper.state().isVisible).toBe(false);
  });

  it('should show content when the toggle icon is clicked', () => {
    jest.spyOn(Dropdown.prototype, 'componentDidUpdate');
    wrapper.setState({ isVisible: false });
    wrapper.find('.dropdown-caret button').simulate('mousedown', event);
    expect(Dropdown.prototype.componentDidUpdate.mock.calls.length).toBe(1);
    expect(wrapper.find('.dropdown-menu').length).toBe(1);
    expect(wrapper.state().isVisible).toBe(true);
  });
  it('should not show content when there is a click outside the drop down', () => {
    const e = {
      preventDefault: jest.fn(),
      type: 'blur',
      target: {
        contains: jest.fn().mockReturnValue(true),
      },
      relatedTarget: 'true',
    };
    wrapper.setState({ isVisible: false });
    wrapper.find('.dropdown-caret button').simulate('mousedown', e);
    expect(wrapper.find('.dropdown-menu').length).toBe(0);
    expect(wrapper.state().isVisible).toBe(false);
  });
});

