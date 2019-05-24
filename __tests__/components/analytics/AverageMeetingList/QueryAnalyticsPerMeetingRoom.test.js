import React from 'react';
import { shallow } from 'enzyme';
import QueryAnalyticsPerMeetingRoom from '../../../../src/components/analytics/AverageMeetingList/QueryAnalyticsPerMeetingRoom';

describe('QueryAnalyticsPerMeetingRoom component', () => {
  const props = {
    data: {
      meetingDurationAnalytics: [
        {
          roomName: 'Malabo',
          count: 63,
          totalDuration: 4355,
        },
      ],
    },
  };
  const wrapper = shallow(<QueryAnalyticsPerMeetingRoom {...props} />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
