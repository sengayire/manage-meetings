import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NavLink from '../../../src/components/helpers/NavLink';

describe('NavLink', () => {
  const preventDefault = jest.fn();
  const history = {};
  const to = '/home';
  const wrapperCode = (
    <MemoryRouter keyLength={0}>
      <NavLink to="/" exact strict />
    </MemoryRouter>
  );
  const wrapper = mount(wrapperCode);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should respond to click events properly', () => {
    const onClick = () => wrapper.simulate('click', { preventDefault }, history, to);
    expect(onClick).not.toThrow();
    expect(wrapper).toMatchSnapshot();
  });
});
