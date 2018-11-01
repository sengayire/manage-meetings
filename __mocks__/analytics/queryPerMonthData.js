import { ANALYTICS_MEETING_ROOM_PER_MONTH } from '../../src/graphql/queries/analytics';

const queryPerMonthData = [
  {
    request: ANALYTICS_MEETING_ROOM_PER_MONTH,
    result: {
      data: {
        monthlyDurationsOfMeetings: {
          MeetingsDurationaAnalytics: [
            {
              roomName: 'Tortuga',
              count: 78,
              totalDuration: 5547,
            },
            {
              roomName: 'Accra',
              count: 73,
              totalDuration: 3313,
            },
          ],
        },
      },
    },
  },
];


export { queryPerMonthData as default };
