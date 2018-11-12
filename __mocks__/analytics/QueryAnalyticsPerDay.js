import { ANALYTICS_MEETING_ROOM_PER_DAY } from '../../src/graphql/queries/analytics';

const queryPerDayData = [
  {
    request: ANALYTICS_MEETING_ROOM_PER_DAY,
    result: {
      data: {
        dailyDurationsOfMeetings: {
          MeetingsDurationaAnalytics: [
            {
              roomName: 'Tortuga',
              count: 45,
              totalDuration: 4567,
            },
            {
              roomName: 'Accra',
              count: 19,
              totalDuration: 8907,
            },
          ],
        },
      },
    },
  },
];
export { queryPerDayData as default };
