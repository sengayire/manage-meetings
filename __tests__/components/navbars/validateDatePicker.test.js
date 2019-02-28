/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';
import { AnalyticsNav as AnalyticComponent } from '../../../src/components/navbars/AnalyticsNav';

jest.mock('moment', () => () => ({
  format: () => jest.fn(),
  diff: jest.fn(() => -1),
}));

const props = {
  leastBookedAnalytics: {
    loading: false,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForLeastBookedRooms: { analytics: roomUsage },
  },
  mostBookedAnalytics: {
    loading: false,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForMostBookedRooms: { analytics: roomUsage },
  },
  dateValue: {
    startDate: 'start date',
    endDate: 'end date',
  },
};

describe('AnalyticsNav Component', () => {
  const user = {
    user: {
      location: 'Kampala',
    },
  };
  it('should update isFutureDateSelected to false when a future date is not selected', () => {
    const componentWrapper = shallow(<AnalyticComponent
      user={user}
      {...props}
    />);
    const analyticNavWrapper = componentWrapper.instance();
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.isFutureDateSelected).toEqual(false);
  });
  it('should update validatedStartDate and validatedEndDate when a future date is not selected', () => {
    const componentWrapper = shallow(<AnalyticComponent
      user={user}
      {...props}
    />);
    const analyticNavWrapper = componentWrapper.instance();
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.validatedStartDate).toEqual('05 Nov 2018');
    expect(analyticNavWrapper.state.validatedEndDate).toEqual('06 Nov 2018');
  });
});
