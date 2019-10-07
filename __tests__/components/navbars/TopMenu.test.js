import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { GET_LOCATION_QUERY, GET_LOCATIONS_QUERY } from '../../../src/graphql/queries/People';

import { TopMenuComponent } from '../../../src/components/navbars/TopMenu';
import {
  getUserLocation,
  getAllLocationsFromCache,
} from '../../../src/components/helpers/QueriesHelpers';
import allLocations from '../../../__mocks__/offices/Locations';

jest.mock('../../../src/components/helpers/QueriesHelpers');
jest.mock('../../../src/utils/Cookie');
jest.mock('../../../src/utils/notification');

const userLocation = {
  id: 1,
  name: 'Lagos',
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
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <TopMenuComponent history={history} />
      </BrowserRouter>
    </MockedProvider>,
  );
});

describe('TopMenu Component', () => {
  it('Should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should update user info', () => {
    const topMenuWrapper = wrapper
      .children(0)
      .children(0)
      .children(0)
      .children(0);
    topMenuWrapper.instance().updateUserInfo({
      firstName: 'foo',
      lastName: 'bar',
    });

    expect(topMenuWrapper.state('firstName')).toBe('foo');
  });
});
