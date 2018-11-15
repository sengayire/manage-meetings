import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import queryPerMonthData from '../../../__mocks__/analytics/queryPerMonthData';
import queryPerDayData from '../../../__mocks__/analytics/QueryAnalyticsPerDay';
import analyticsPerWeekData from '../../../__mocks__/analytics/QueryPerWeekData';
import AverageMeetingList from '../../../src/components/analytics/AverageMeetingList';

describe('AverageMeetingList component for case: This month', () => {
  it('should render correctly', async () => {
    const wrapper = mount((
      <MockedProvider mocks={queryPerMonthData} addTypename={false}>
        <AverageMeetingList dateValue="This Month" />
      </MockedProvider>
    ));
    await wait(0);
    const findClass = wrapper.find('.showingBlock');
    expect(findClass.length).toBe(1);
  });
});

describe('AverageMeetingList component for case: Today', () => {
  it('should render correctly', async () => {
    const wrapper = mount((
      <MockedProvider mocks={queryPerDayData} addTypename={false}>
        <AverageMeetingList dateValue="Today" />
      </MockedProvider>
    ));
    await wait(0);
    const findClass = wrapper.find('.average-meeting-list');
    expect(findClass.length).toBe(1);
    expect(wrapper).toMatchSnapshot({
      value: expect.any(/\w{3}\s\d{2}\s\d{4}/),
    });
  });
});

describe('AverageMeetingList component for case: This Week', () => {
  it('should render correctly', async () => {
    const wrapper = mount((
      <MockedProvider mocks={analyticsPerWeekData} addTypename={false}>
        <AverageMeetingList dateValue="This Week" />
      </MockedProvider>
    ));
    await wait(0);
    const findClass = wrapper.find('.average-meeting-list');
    expect(findClass.length).toBe(1);

    expect(wrapper).toMatchSnapshot({
      value: expect.any(/\w{3}\s\d{2}\s\d{4}/),
    });
  });
});
