import React from 'react';
import { mount } from 'enzyme';
import AverageMeetingListComponent from '../../../src/components/analytics/AverageMeetingList';
import AnalyticsContext from '../../../src/components/helpers/AnalyticsContext';
import allAnalyticsMockData from '../../../__mocks__/analytics/allAnalyticsMockData';


describe('Average Meeting List Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <AnalyticsContext.Provider value={allAnalyticsMockData} >
        <AverageMeetingListComponent />
      </AnalyticsContext.Provider>,
    );
  });

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
