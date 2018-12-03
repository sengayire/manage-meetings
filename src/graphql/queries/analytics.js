import gql from 'graphql-tag';

const MEETING_DURATION_ANALYTICS = gql`
  query durationOfMeetingsPerMeetingRoom(
    $startDate: String!
    $endDate: String!
  ) {
    analyticsForMeetingsDurations(startDate: $startDate, endDate: $endDate) {
      MeetingsDurationaAnalytics {
        roomName
        count
        totalDuration
      }
    }
  }
`;

export { MEETING_DURATION_ANALYTICS as default };
