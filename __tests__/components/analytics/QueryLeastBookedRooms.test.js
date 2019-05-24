import React from 'react';
import { mount } from 'enzyme';
import { QueryLeastBookedRooms } from '../../../src/components/analytics/QueryLeastBookedRooms';
import AnalyticsContext from '../../../src/components/helpers/AnalyticsContext';
import allAnalyticsMockData from '../../../__mocks__/analytics/allAnalyticsMockData';

jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('Query Least Booked Rooms Component', () => {
  it('should load progressBar', () => {
    const wrapper = mount(
      <AnalyticsContext.Provider value={allAnalyticsMockData} >
        <QueryLeastBookedRooms />
      </AnalyticsContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
