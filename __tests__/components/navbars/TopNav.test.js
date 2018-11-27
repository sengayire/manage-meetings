import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import TopNav from '../../../src/components/navbars/TopNav';

describe('TopNav Component', () => {
  const wrapper = mount(<MemoryRouter ><TopNav /></MemoryRouter>);

  it('renders correctly in memory', () => {
    expect(wrapper.find(TopNav)).toHaveLength(1);
  });

  it('renders active link in the nav', () => {
    const navWrapper = wrapper.find('.active').children();
    wrapper.find('.converge-link').at(2).simulate('click');
    expect(navWrapper).toHaveLength(1);
  });
});
