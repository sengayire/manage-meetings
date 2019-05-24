import React from 'react';
import { mount } from 'enzyme';
import { Checkins } from '../../../../src/components/analytics/checkins';
import AnalyticsContext from '../../../../src/components/helpers/AnalyticsContext';
import allAnalyticsMockData from '../../../../__mocks__/analytics/allAnalyticsMockData';

describe('Checkins component', () => {
  const wrapper = mount(
    <AnalyticsContext.Provider value={allAnalyticsMockData} >
      <Checkins />
    </AnalyticsContext.Provider>,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('contains three doughnut charts', () => {
    expect(wrapper.find('.checkins').children()).toHaveLength(3);
  });
});
