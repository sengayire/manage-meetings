import React from 'react';
import { shallow } from 'enzyme';
import TopMenu from '../../src/components/TopMenu';

describe('TopMenu Component', () => {
  const wrapper = shallow(<TopMenu />);
  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('displays the logo', () => {
    const logo = wrapper.find('.logo');

    expect(logo).toHaveLength(1);
    expect(logo
      .children()
      .at(0)
      .type()).toEqual('img');
  });
  it('should show a search input', () => {
    // Our top menu should have a search form
    const search = wrapper.find('.search-bar');

    expect(search).toHaveLength(1);
    expect(search.type()).toEqual('input');
    expect(search.parent().type()).toEqual('form');
  });
});
