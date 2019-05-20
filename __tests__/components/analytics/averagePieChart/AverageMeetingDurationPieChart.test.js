import React from 'react';
import { shallow } from 'enzyme';
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
  beforeAll(() => {
    getAnalyticForMeetingDurations.mockResolvedValue(analyticsForMeetingsDurations);
    wrapper = shallow(<AverageMeetingDurationPieChart {...props} name="data" updateParent={jest.fn()} />);
  });

  it('renders correctly from memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an initial state ', () => {
    jest.spyOn(AverageMeetingDurationPieChart.prototype, 'componentDidMount').mockImplementationOnce(() => {});
    wrapper = shallow(<AverageMeetingDurationPieChart {...props} name="data" updateParent={jest.fn()} />);
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
    wrapper.setProps({ ...props });
    expect(wrapper.find('ErrorIcon').length).toEqual(1);
  });

  it('should call the getSectorWidths function', () => {
    const MeetingsDurationaAnalytics = [
      {
        count: 0,
        totalDuration: 0,
      },
    ];
    const getSectorWidthsSpy = jest.spyOn(wrapper.instance(), 'getSectorWidths');
    wrapper.instance().getSectorWidths(MeetingsDurationaAnalytics);
    expect(getSectorWidthsSpy).toHaveBeenCalled();
  });
});
