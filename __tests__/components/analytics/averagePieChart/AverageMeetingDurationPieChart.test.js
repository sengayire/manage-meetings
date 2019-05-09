import React from 'react';
import { mount } from 'enzyme';
import { AverageMeetingDurationPieChart }
  from '../../../../src/components/analytics/averagePieChart/AverageMeetingDurationPieChart';
import { getAnalyticForMeetingDurations } from '../../../../src/components/helpers/QueriesHelpers';

jest.mock('../../../../src/components/helpers/QueriesHelpers');

describe('Average Meetings Duration PieChart Component', () => {
  const props = {
    dateValue: { startDate: 'Jan 23 2019', endDate: 'Jan 25 2019' },
    queryCompleted: jest.fn(),
  };

  const analyticsForMeetingsDurations = {
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
  };

  let wrapper;
  beforeEach(() => {
    getAnalyticForMeetingDurations.mockResolvedValue(analyticsForMeetingsDurations);
    wrapper = mount(<AverageMeetingDurationPieChart {...props} name="data" updateParent={jest.fn()} />);
  });

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an initial state ', () => {
    jest.spyOn(AverageMeetingDurationPieChart.prototype, 'componentDidMount').mockImplementationOnce(() => {});
    wrapper = mount(<AverageMeetingDurationPieChart {...props} name="data" updateParent={jest.fn()} />);
    expect(wrapper.state())
      .toEqual({
        analyticsForMeetingsDurations: {},
        loading: true,
      });
  });

  it('should render a Pie chart', () => {
    const pieChart = wrapper.find('Pie');
    expect(pieChart.length).toEqual(1);
  });

  it('should show an error when a future date is selected', () => {
    props.dateValue.isFutureDateSelected = true;
    const myWrapper = mount(<AverageMeetingDurationPieChart {...props} name="data" updateParent={jest.fn()} />);
    expect(myWrapper.find('ErrorIcon').length).toEqual(1);
    expect(myWrapper.find('ErrorIcon').text()).toEqual('You cannot fetch data beyond today');
  });
});
