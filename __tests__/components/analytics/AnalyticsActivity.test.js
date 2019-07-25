import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import AnalyticsActivityComponent from '../../../src/containers/AnalyticsActivity';
import * as QueryHelper from '../../../src/components/helpers/QueriesHelpers';

moment.suppressDeprecationWarnings = true;
jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('AnalyticsActivity component', () => {
  let wrapper;
  const props = {
    queryCompleted: jest.fn(),
    dateValue: {
      startDate: moment('2019 29 Apr', 'YYYY-MM-DD'),
      endDate: moment('2019 29 Apr', 'YYYY-MM-DD'),
    },
  };

  const userData = {
    id: '41',
    location: 'Nairobi',
    firstName: 'James',
  };

  const data = {
    allEvents: {
      events: [
        {
          room: {
            name: 'Test Room',
          },
          eventTitle: 'Ebot / Chrispine Feedback Sync',
          endTime: '2019-06-14T04:00:00-07:00',
          checkedIn: false,
          startTime: '2019-06-14T03:30:00-07:00',
          checkInTime: null,
          cancelled: false,
          numberOfParticipants: 3,
        },
        {
          room: {
            name: 'Test Room',
          },
          eventTitle: 'Robert <> Chrispine Feedback Sync',
          endTime: '2019-06-14T02:30:00-07:00',
          checkedIn: false,
          startTime: '2019-06-14T02:00:00-07:00',
          checkInTime: null,
          cancelled: false,
          numberOfParticipants: 3,
        },
        {
          room: {
            name: 'pandora edited',
          },
          eventTitle: 'ML&DP',
          endTime: '2019-06-13T06:30:00-07:00',
          checkedIn: false,
          startTime: '2019-06-13T04:15:00-07:00',
          checkInTime: null,
          cancelled: false,
          numberOfParticipants: 2,
        },
        {
          room: {
            name: 'Tortuga',
          },
          eventTitle: 'Resource Assignment',
          endTime: '2019-06-13T06:30:00-07:00',
          checkedIn: false,
          startTime: '2019-06-13T04:00:00-07:00',
          checkInTime: null,
          cancelled: false,
          numberOfParticipants: 3,
        },
        {
          room: {
            name: 'Tortuga',
          },
          eventTitle: null,
          endTime: '2019-06-13T03:00:00-07:00',
          checkedIn: false,
          startTime: '2019-06-13T02:00:00-07:00',
          checkInTime: null,
          cancelled: false,
          numberOfParticipants: 4,
        },
      ],
      pages: 10,
      hasPrevious: true,
      hasNext: true,
      queryTotal: 48,
    },
  };

  const errorData = 'GraphQL error: Events do not exist for the date range';

  QueryHelper.getAnalyticForDailyRoomsEvents.mockResolvedValue(errorData);
  QueryHelper.getUserDetails.mockResolvedValue(userData);

  beforeEach(() => {
    wrapper = mount(<AnalyticsActivityComponent {...props} />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state correctly and displays an overlay on top of a dummy data ', async () => {
    QueryHelper.getAnalyticForDailyRoomsEvents.mockResolvedValue(data);
    const component = wrapper.instance();
    await component.getAnalyticsForDailyRoomEvents(1, 1);
    jest.spyOn(component, 'setState').mockResolvedValue();
    component.setState({
      analyticsForDailyRoomEvents: data,
    });
    expect(wrapper.instance().setState).toBeCalled();
    expect(wrapper.find('Spinner').exists()).toBe(true);
    expect(wrapper.find('.centered').exists()).toBe(true);
    expect(wrapper.find('.meeting-title').exists()).toBe(true);
    expect(wrapper.find('.activity-info-row').exists()).toBe(true);
  });

  it('should re-render UI with a new set of data when date values are changed in props', () => {
    wrapper.setProps({
      dateValue: {
        startDate: moment('2019 28 Apr', 'YYYY-MM-DD'),
        endDate: moment('2019 28 Apr', 'YYYY-MM-DD'),
      },
    });
    expect(QueryHelper.getAnalyticForDailyRoomsEvents).toHaveBeenCalled();
  });

  it('should update the state of location with the logged in user location', async () => {
    await wrapper.instance().getLocation();
    expect(wrapper.state('location').length).toBe(7);
    expect(QueryHelper.getUserDetails).toHaveBeenCalled();
  });

  it('should render daily room events', async () => {
    const component = mount(<AnalyticsActivityComponent {...props} />);
    component.update();
    expect(component).toMatchSnapshot();
    expect(component.state().loading).toBe(true);
    expect(component.state().error).toBe(false);
  });
});
