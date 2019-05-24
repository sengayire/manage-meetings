import React from 'react';
import { mount } from 'enzyme';
import BookingsCountBarGraph from '../../../../src/components/analytics/barGraph/BookingsCountBarGraph';
import AnalyticsContext from '../../../../src/components/helpers/AnalyticsContext';
import allAnalyticsMockData from '../../../../__mocks__/analytics/allAnalyticsMockData';


describe('Bookings Count Bar Graph Component', () => {
  const wrapper = mount(
    <AnalyticsContext.Provider value={allAnalyticsMockData} >
      <BookingsCountBarGraph />
    </AnalyticsContext.Provider>,
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to hover', () => {
    const helpIcon = wrapper.find('img[alt="help icon"]');
    const nativeEvent = { nativeEvent: { clientX: 300, clientY: 250 } };
    helpIcon.simulate('mouseenter', nativeEvent);
    expect(wrapper).toMatchSnapshot();
    helpIcon.simulate('mouseleave', nativeEvent);
    expect(wrapper).toMatchSnapshot();
  });
});
