import React from 'react';
import { mount } from 'enzyme';
import AnalyticsContext from '../../../src/components/helpers/AnalyticsContext';
import QueryBookingsCount from '../../../src/components/analytics/QueryBookingsCount';
import allAnalyticsMockData from '../../../__mocks__/analytics/allAnalyticsMockData';


describe('Query Bookings Count Component', () => {
  it('should render without error', async () => {
    const tree = mount(
      <AnalyticsContext.Provider value={allAnalyticsMockData} >
        <QueryBookingsCount />
      </AnalyticsContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
