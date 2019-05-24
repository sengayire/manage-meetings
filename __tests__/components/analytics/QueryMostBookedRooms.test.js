import React from 'react';
import { mount } from 'enzyme';
import { QueryMostBookedRooms } from '../../../src/components/analytics/QueryMostBookedRooms';
import AnalyticsContext from '../../../src/components/helpers/AnalyticsContext';
import allAnalyticsMockData from '../../../__mocks__/analytics/allAnalyticsMockData';


describe('Query Most Booked Rooms Component', () => {
  it('should load progressBar', () => {
    const wrapper = mount(
      <AnalyticsContext.Provider value={allAnalyticsMockData} >
        <QueryMostBookedRooms />
      </AnalyticsContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
