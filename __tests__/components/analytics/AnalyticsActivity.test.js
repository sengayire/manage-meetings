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
  const data = {
    analyticsForDailyRoomEvents: {
      DailyRoomEvents: [],
    },
  };

  const userData = {
    id: '41',
    location: 'Nairobi',
    firstName: 'James',
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

  it('should display no resource found message when the data returned is empty', async () => {
    jest.spyOn(QueryHelper, 'getAnalyticForDailyRoomsEvents').mockImplementationOnce(() => data);
    await wrapper.instance().getAnalyticsForDailyRoomEvents();
    wrapper.update();
    expect(wrapper.find('.error-msg').text()).toBe('No resource found');
  });

  it('should display daily events data from the backend', async () => {
    data.analyticsForDailyRoomEvents.DailyRoomEvents = meetingsData.DummyDailyRoomEvents;
    jest.spyOn(QueryHelper, 'getAnalyticForDailyRoomsEvents').mockImplementationOnce(() => data);
    await wrapper.instance().getAnalyticsForDailyRoomEvents();
    wrapper.update();
    expect(wrapper.find('.activity-info-row').exists()).toBe(true);
  });

  it('should update the state of location with the logged in user location', async () => {
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => userData);
    expect(wrapper.state('location').length).toBe(0);
    await wrapper.instance().getLocation();
    expect(wrapper.state('location').length).toBe(7);
  });
});
