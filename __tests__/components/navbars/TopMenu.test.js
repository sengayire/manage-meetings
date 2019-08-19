import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import toastr from 'toastr';
import { GET_LOCATION_QUERY, GET_LOCATIONS_QUERY } from '../../../src/graphql/queries/People';

import { TopMenuComponent } from '../../../src/components/navbars/TopMenu';
import notification from '../../../src/utils/notification';
import { getUserLocation, getAllLocationsFromCache } from '../../../src/components/helpers/QueriesHelpers';
import allLocations from '../../../__mocks__/offices/Locations';


jest.mock('../../../src/components/helpers/QueriesHelpers');
jest.mock('../../../src/utils/Cookie');
jest.mock('../../../src/utils/notification');

const userLocation = {
  id: 1, name: 'Lagos',
};
getUserLocation.mockReturnValue(userLocation);

getAllLocationsFromCache.mockReturnValue(allLocations.data.allLocations);

let wrapper;
const history = {
  push: jest.fn(),
};

const mocks = [
  { request: { query: GET_LOCATION_QUERY }, result: { userLocation } },
  { request: { query: GET_LOCATIONS_QUERY }, result: allLocations.data.allLocations },
];

beforeAll(() => {
  wrapper = mount(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <BrowserRouter>
        <TopMenuComponent
          history={history}
        />
      </BrowserRouter>
    </MockedProvider>);
});

describe('TopMenu Component', () => {
  it('Should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should update user info', () => {
    const topMenuWrapper = wrapper.children(0).children(0).children(0).children(0);
    topMenuWrapper.instance().updateUserInfo({
      firstName: 'foo',
      lastName: 'bar',
    });

    expect(topMenuWrapper.state('firstName')).toBe('foo');
  });

  it('Should show error if searchng without criteria', () => {
    notification.mockImplementation(() => () => {});
    wrapper.find('Input').find('input').simulate('keydown', {
      keyCode: 13,
      preventDefault: jest.fn(),
    });
    expect(notification).toHaveBeenCalledWith(toastr, 'error', 'Please select search criteria');
  });

  it('Should show options', () => {
    const topMenuWrapper = wrapper.children(0).children(0).children(0).children(0);
    topMenuWrapper.find('Input').find('input').simulate('focus');
    expect(topMenuWrapper.state('showOptions')).toBe(true);
  });

  it('Should handle query input', () => {
    const topMenuWrapper = wrapper.children(0).children(0).children(0).children(0);
    topMenuWrapper.find('Input').find('input').simulate('change', { target: { value: 'foo' } });
    expect(topMenuWrapper.state('query')).toBe('foo');
  });

  it('Should set search criteria', () => {
    const topMenuWrapper = wrapper.children(0).children(0).children(0).children(0);
    const mockFocusFunc = jest.spyOn(topMenuWrapper.instance(), 'setFocus').mockImplementation(() => {});
    topMenuWrapper.find('button').at(0).simulate('click');
    expect(mockFocusFunc).toHaveBeenCalled();
    expect(topMenuWrapper.state('component')).toBe('rooms');
  });

  it('Should handle search', () => {
    const topMenuWrapper = wrapper.children(0).children(0).children(0).children(0);
    topMenuWrapper.find('Input').find('input').simulate('keydown', {
      keyCode: 13,
      preventDefault: jest.fn(),
    });
    expect(history.push).toHaveBeenLastCalledWith({
      pathname: '/setup',
      state: {
        component: 'rooms',
        query: 'foo',
      },
    });
  });
});
