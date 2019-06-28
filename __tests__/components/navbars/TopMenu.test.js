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
});
