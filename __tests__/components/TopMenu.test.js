import React from 'react';
import { shallow } from 'enzyme';
import TopMenu from '../../src/components/TopMenu';
import ProfileIcon from '../../src/assets/images/profile_icon.svg';
// mocking the decodeTokenAndGetUserData method to return something in the TopMenu component
jest.mock('../../src/utils/Cookie');
const cookieFunctions = require('../../src/utils/Cookie');

// creating mock names to use
const mockFirstName = 'MockFirstName';
const mockLastName = 'MockLastName';

// implementing the method mock
cookieFunctions.decodeTokenAndGetUserData.mockImplementation(() => ({
  UserInfo: {
    picture: ProfileIcon,
    first_name: mockFirstName,
    last_name: mockLastName,
  },
}));

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

  it('should render the correct name and logo', () => {
    expect(wrapper.find('.profile>img').prop('src')).toBe('test-file-stub');
    expect(wrapper.find('.username').text()).toBe(`${mockFirstName} ${mockLastName}`);
  });
});
