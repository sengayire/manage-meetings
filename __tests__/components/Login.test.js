import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import Login from '../../src/components/Login';

describe('Login component', () => {
  const wrapper = <MemoryRouter keyLength={0}><Login /></MemoryRouter>;
  const mountWrapper = mount(wrapper);
  const shallowWrapper = shallow(wrapper);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(wrapper, div);
  });

  it('renders correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('renders the correct heading text', () => {
    expect(mountWrapper.find('header>h1')).toHaveLength(1);
    expect(mountWrapper.find('header>h1').text()).toBe('CONVERGE');
  });

  it('renders the correct mrm introduction text', () => {
    const mrmIntro =
      'Meet the Meeting Room Appthat your meeting room app aspires to be.';
    expect(mountWrapper.find('#converge-intro')).toHaveLength(1);
    expect(mountWrapper.find('#converge-intro').text()).toBe(mrmIntro);
  });

  it('renders the tablet image', () => {
    expect(mountWrapper.find('#dark-tablet img')).toHaveLength(1);
  });

  it('renders login button', () => {
    //   check whether login button exists
    expect(mountWrapper.find('.btn-signin')).toHaveLength(1);
  });
});
