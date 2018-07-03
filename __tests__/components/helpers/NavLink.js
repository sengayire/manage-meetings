import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NavLink, { handleClick } from '../../../src/components/helpers/NavLink';

describe('NavLink', () => {
  const preventDefault = jest.fn();
  const history = { push: jest.fn() };
  const to = '/home';
  const toObject = { pathname: '/index' };
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

  it('handleClick method should be called with the right props', () => {
    handleClick({ preventDefault }, history, to);
    expect(preventDefault).toBeCalled();
    expect(history.push).toBeCalled();
    expect(history.push).toBeCalledWith(to);

    handleClick({ preventDefault }, history, toObject);
    expect(preventDefault).toBeCalled();
    expect(history.push).toBeCalled();
    expect(history.push).toBeCalledWith(toObject.pathname);
  });
});
