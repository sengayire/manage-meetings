/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsNav from '../../../src/components/navbars/AnalyticsNav';
import AnalyticsActivity from '../../../src/containers/AnalyticsActivity';
import Calendar from '../../../src/components/commons/Calendar';
import ExportButton from '../../../src/components/commons/ExportButton';
import { getUserDetails, getAllAnalytics, getAllRooms } from '../../../src/components/helpers/QueriesHelpers';
import allAnalyticsMockData from '../../../__mocks__/analytics/allAnalyticsMockData';


jest.mock('../../../src/components/helpers/QueriesHelpers');

describe('AnalyticsNav Component', () => {
  let wrapper;
  beforeAll(() => {
    getUserDetails.mockResolvedValue({ location: 'Nigeria' });
    const { rooms, ...analytics } = allAnalyticsMockData.analytics;
    getAllAnalytics.mockResolvedValue({ allAnalytics: analytics });
    getAllRooms.mockResolvedValue({ allRooms: rooms });
    wrapper = shallow(<AnalyticsNav />);
  });


  it('should not render calendar or download button while fetching', () => {
    wrapper.setState({ fetching: true });
    expect(wrapper.find(Calendar).length).toEqual(0);
    expect(wrapper.find(ExportButton).length).toEqual(0);
  });

  it('should render the AnalyticsActivity with length of 1', () => {
    wrapper.setState({ activeTab: 'activity' });
    wrapper.find('Button').at(1).dive().find('.activityIconBtn')
      .simulate('click');
    expect(wrapper.find(AnalyticsActivity).length).toEqual(1);
  });

  it('should display the location of the user', () => {
    wrapper.setState({ activeTab: 'activity', location: 'Nigeria' });
    expect(wrapper.find('Button').at(2).dive().find('.location-btn')
      .text()).toEqual('Nigeria');
  });

  it('should call sendDateData once and update the state value of start and end date', () => {
    wrapper.instance().sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(wrapper.state('endDate')).toBe('06 Nov 2018');
    expect(wrapper.state('startDate')).toEqual('05 Nov 2018');
  });
});
