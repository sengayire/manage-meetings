import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import TopNav from '../../../src/components/navbars/TopNav';

describe('TopNav Component', () => {
  it('renders correctly in memory', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/analytics']} ><TopNav /></MemoryRouter>);
    expect(wrapper.find(TopNav)).toHaveLength(1);
  });

  it('renders active link in the nav', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/analytics']} ><TopNav userRole="Default user" /></MemoryRouter>);
    const navWrapper = wrapper.find('.active').children();
    expect(navWrapper).toHaveLength(1);
  });

  it('renders no active link in the nav', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/analy']} ><TopNav /></MemoryRouter>);
    expect(wrapper.find('.active')).toHaveLength(0);
  });
});
