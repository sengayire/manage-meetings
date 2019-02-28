import React from 'react';
import { mount } from 'enzyme';
import { AverageMeetingDurationPieChart }
  from '../../../../src/components/analytics/averagePieChart/AverageMeetingDurationPieChart';

describe('Average Meetings Duration PieChart Component', () => {
  const props = {
    dateValue: { startDate: 'Jan 23 2019', endDate: 'Jan 25 2019' },
    data: {
      fetchMore: jest.fn(() => Promise.resolve()),
      analyticsForMeetingsDurations: {
        MeetingsDurationaAnalytics: [
          {
            count: 4,
            totalDuration: 25,
          },
          {
            count: 1,
            totalDuration: 50,
          },
          {
            count: 1,
            totalDuration: 35,
          },
          {
            count: 1,
            totalDuration: 2440,
          },
        ],
      },
    },
    queryCompleted: jest.fn(),
  };
  const wrapper = mount(<AverageMeetingDurationPieChart {...props} name="data" />);

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an initial state ', () => {
    expect(wrapper.state())
      .toEqual({ analyticsForMeetingsDurations: props.data.analyticsForMeetingsDurations });
  });

  it('should render a Pie chart', () => {
    const pieChart = wrapper.find('Pie');
    expect(pieChart.length).toEqual(1);
  });

  it('should show an error when a future date is selected', () => {
    props.dateValue.isFutureDateSelected = true;
    const myWrapper = mount(<AverageMeetingDurationPieChart {...props} name="data" />);
    expect(myWrapper.find('ErrorIcon').length).toEqual(1);
    expect(myWrapper.find('ErrorIcon').text()).toEqual('You cannot fetch data beyond today');
  });
});
