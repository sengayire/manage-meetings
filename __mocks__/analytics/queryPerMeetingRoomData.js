import { MEETING_DURATION_ANALYTICS } from '../../src/graphql/queries/analytics';

const queryPerMeetingRoomData = [
  {
    request: {
      query: MEETING_DURATION_ANALYTICS,
      variables: { startDate: '01 Nov 2018', endDate: '02 Nov 2018' },
    },
    result: {
      data: {
        analyticsForMeetingsDurations: {
          MeetingsDurationaAnalytics: [
            {
              roomName: 'Tortuga',
              count: 1,
              totalDuration: 61,
            },
          ],
        },
      },
      errors: {
        graphQLErrors: [{ message: 'Error occured' }],
      },
    },
  },
];

export { queryPerMeetingRoomData as default };
