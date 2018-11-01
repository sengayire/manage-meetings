import ANALYTICS_MEETING_ROOM_PER_WEEK_DATA from '../../src/graphql/queries/analytics';

const analyticsPerWeekData = [
  {
    request: ANALYTICS_MEETING_ROOM_PER_WEEK_DATA,
    result: {
      data: {
        weeklyDurationsOfMeetings: {
          MeetingsDurationaAnalytics: [
            {
              roomName: 'Tortuga',
              count: 22,
              totalDuration: 1125,
            },
            {
              roomName: 'Accra',
              count: 12,
              totalDuration: 670,
            },
          ],
        },
      },
    },
  },
];

export { analyticsPerWeekData as default };
