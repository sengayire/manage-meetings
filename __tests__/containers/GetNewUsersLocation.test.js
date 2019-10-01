import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import GetNewUsersLocation from '../../src/containers/GetNewUsersLocation';
import SelectLocation from '../../src/components/navbars/AnalyticsNav/SelectLocation';
import allLocations from '../../__mocks__/offices/Locations';
import { getAllLocationsFromCache } from '../../src/components/helpers/QueriesHelpers';

const userLocation = 'Lagos';
jest.mock('../../src/components/helpers/QueriesHelpers');

getAllLocationsFromCache.mockResolvedValue(allLocations.data.allLocations);

const wrapper = mount(
  <MockedProvider addTypename={false}>
    <GetNewUsersLocation
      userLocation={userLocation}
    />
  </MockedProvider>,
);


describe('Get New Users Component', () => {
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('to render toggle location properly', () => {
    wrapper.setState({ showLocations: true });
    wrapper.find('Button').children(0).find('.btn-right__location__btn').simulate('click');
    expect(wrapper.find(SelectLocation).length).toEqual(1);
  });

  it('to change users location', () => {
    wrapper.setState({
      showLocations: true,
      location: 'Kampala',
    });

    wrapper.find('SelectLocation').children(0).find('button').find('.location__btn')
      .first()
      .simulate('click');
    expect(wrapper.find(SelectLocation).length).toEqual(1);
  });
});
