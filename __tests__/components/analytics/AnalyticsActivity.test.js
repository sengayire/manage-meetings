import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import AnalyticsActivityComponent from '../../../src/containers/AnalyticsActivity';
import * as QueryHelper from '../../../src/components/helpers/QueriesHelpers';
import meetingsData from '../../../src/utils/activityData';

moment.suppressDeprecationWarnings = true;

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
      hasNext: null,
      hasPrevious: null,
      pages: null,
      DailyRoomEvents: [
        {
          day: 'Mon Jun 17 2019',
          events: [],
        },
        {
          day: 'Fri Jun 14 2019',
          events: [],
        },
        {
          day: 'Thu Jun 13 2019',
          events: [],
        },
        {
          day: 'Wed Jun 12 2019',
          events: [],
        },
        {
          day: 'Tue Jun 11 2019',
          events: [],
        },
        {
          day: 'Mon Jun 10 2019',
          events: [],
        },
        {
          day: 'Fri Jun 07 2019',
          events: [],
        },
        {
          day: 'Thu Jun 06 2019',
          events: [],
        },
        {
          day: 'Wed Jun 05 2019',
          events: [],
        },
        {
          day: 'Tue Jun 04 2019',
          events: [],
        },
        {
          day: 'Mon Jun 03 2019',
          events: [],
        },
      ],
    },
  };

  const noResourceData = {
    allEvents: {
      hasNext: null,
      hasPrevious: null,
      pages: null,
      DailyRoomEvents: [],
    },
  };

  beforeEach(() => {
    wrapper = mount(<AnalyticsActivityComponent {...props} />);
  });

  it('renders loading state correctly and displays an overlay on top of a dummy data ', () => {
    wrapper.instance().setState({
      analyticsForDailyRoomEvents: meetingsData,
    });
    expect(wrapper.find('Spinner').exists()).toBe(true);
    expect(wrapper.find('.centered').exists()).toBe(true);
    expect(wrapper.find('.meeting-title').exists()).toBe(true);
    expect(wrapper.find('.activity-info-row').exists()).toBe(true);
  });

  it('should re-render UI with a new set of data when date values are changed in props', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getAnalyticsForDailyRoomEvents');
    wrapper.setProps({
      dateValue: {
        startDate: moment('2019 28 Apr', 'YYYY-MM-DD'),
        endDate: moment('2019 28 Apr', 'YYYY-MM-DD'),
      },
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should update the state of location with the logged in user location', async () => {
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => userData);
    expect(wrapper.state('location').length).toBe(0);
    await wrapper.instance().getLocation();
    expect(wrapper.state('location').length).toBe(7);
  });

  it('should render daily room events', async () => {
    wrapper.instance().setState({
      analyticsForDailyRoomEvents: '',
    });
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => userData);
    jest.spyOn(QueryHelper, 'getAnalyticForDailyRoomsEvents').mockImplementationOnce(() => data);
    const component = mount(<AnalyticsActivityComponent {...props} />);
    component.update();
    expect(component).toMatchSnapshot();
  });

  it('should render resource not founr', async () => {
    wrapper.instance().setState({
      analyticsForDailyRoomEvents: '',
    });
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => userData);
    jest.spyOn(QueryHelper, 'getAnalyticForDailyRoomsEvents').mockImplementationOnce(() => noResourceData);
    const component = mount(<AnalyticsActivityComponent {...props} />);
    component.update();
    expect(component).toMatchSnapshot();
  });
});
