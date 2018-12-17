import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import AverageMeetingList from '../../../src/components/analytics/AverageMeetingList';
import MEETING_DURATION_ANALYTICS from '../../../src/graphql/queries/analytics';

describe('Average Meeting List Component', () => {
  const props = {
    dateValue: { startDate: 'Nov 02 2018', endDate: 'Nov 03 2018' },
  };

  const mocks = [
    {
      request: {
        query: MEETING_DURATION_ANALYTICS,
        variables: {
          startDate: 'Nov 02 2018',
          endDate: 'Nov 03 2018',
          page: 1,
          perPage: 5,
        },
      },
      result: {
        data: {
          analyticsForMeetingsDurations: {
            hasPrevious: false,
            hasNext: true,
            pages: 7,
            MeetingsDurationaAnalytics: [
              {
                roomName: 'Entebbe',
                count: 62,
                totalDuration: 2440,
              },
            ],
          },
        },
      },
    },
  ];

  const setup = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AverageMeetingList {...props} />
    </MockedProvider>
  );

  const wrapper = mount(setup);

  it('renders correctly from memory', () => {
    expect(shallow(<AverageMeetingList {...props} />)).toMatchSnapshot();
  });

  it('Should render <AverageMeetingList />', async () => {
    await wait(0); // Wait a tick to get past the loading state
    expect(wrapper.text()).toContain('Entebbe');
  });
});
