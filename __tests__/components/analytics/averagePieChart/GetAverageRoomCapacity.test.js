import React from 'react';
import { mount } from 'enzyme';
import { GetAverageRoomCapacityComponent } from '../../../../src/components/analytics/averagePieChart/GetAverageRoomCapacity';
import allAnalyticsMockData from '../../../../__mocks__/analytics/allAnalyticsMockData';
import AnalyticsContext from '../../../../src/components/helpers/AnalyticsContext';

describe('Get Average Room Capacity Component', () => {
  const wrapper = mount(
    <AnalyticsContext.Provider value={allAnalyticsMockData} >
      <GetAverageRoomCapacityComponent />
    </AnalyticsContext.Provider>,
  );
  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
});

