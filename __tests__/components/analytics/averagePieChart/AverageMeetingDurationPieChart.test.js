import React from 'react';
import { mount } from 'enzyme';
import AverageMeetingDurationPieChart
  from '../../../../src/components/analytics/averagePieChart/AverageMeetingDurationPieChart';
import allAnalyticsMockData from '../../../../__mocks__/analytics/allAnalyticsMockData';
import AnalyticsContext from '../../../../src/components/helpers/AnalyticsContext';

describe('Average Meetings Duration PieChart Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <AnalyticsContext.Provider value={allAnalyticsMockData}>
        <AverageMeetingDurationPieChart />;
      </AnalyticsContext.Provider>,
    );
  });

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
