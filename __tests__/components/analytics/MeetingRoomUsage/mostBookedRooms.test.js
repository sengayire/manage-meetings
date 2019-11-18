import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import apolloClient from '../../../../src/utils/ApolloClient';
import MostBookedRooms from '../../../../src/components/insights/insightsComponents/mostBookedRooms';

jest.mock('../../../../src/components/helpers/QueriesHelpers');
// eslint-disable-next-line import/first
import { getUserLocation } from '../../../../src/components/helpers/QueriesHelpers';


getUserLocation.mockImplementation(() => (
  [
    { id: '2', name: 'Kampala' },
    { id: '10', name: 'Kigali' },
    { id: '1', name: 'Lagos' },
    { id: '3', name: 'Nairobi' },
  ]
));
describe('InsightsDropdown component', () => {
  mount(
    <MockedProvider client={apolloClient}>
      <MostBookedRooms />
    </MockedProvider>,
  );
  it('snapshot renders', () => {
  });
});
