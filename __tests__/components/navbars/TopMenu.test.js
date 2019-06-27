import React from 'react';
import { shallow } from 'enzyme';
import TopMenu from '../../../src/components/navbars/TopMenu';
import { profileIcon } from '../../../src/utils/images/images';
// mocking the decodeTokenAndGetUserData method to return something in the TopMenu component
jest.mock('../../../src/utils/Cookie');
const cookieFunctions = require('../../../src/utils/Cookie');

// creating mock names to use
const mockFirstName = 'MockFirstName';
const mockLastName = 'MockLastName';

// implementing the method mock
cookieFunctions.decodeTokenAndGetUserData.mockImplementation(() => ({
  UserInfo: {
    picture: profileIcon,
    first_name: mockFirstName,
    last_name: mockLastName,
  },
}));

jest.useFakeTimers();

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
    const search = wrapper.find('Input');

    expect(search).toHaveLength(1);
    expect(search.parent().type()).toEqual('div');
  });

  it('should render the correct name and logo', () => {
    expect(wrapper.find('.profile>img').prop('src')).toBe(profileIcon);
    expect(wrapper.find('.username').text()).toBe(`${mockFirstName} ${mockLastName}`);
  });
});
