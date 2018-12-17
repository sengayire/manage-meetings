import gql from 'graphql-tag';

const MEETING_DURATION_ANALYTICS = gql`
  query durationOfMeetingsPerMeetingRoom(
    $startDate: String!
    $endDate: String!
    $page: Int
    $perPage: Int
  ) {
    analyticsForMeetingsDurations(startDate: $startDate, endDate: $endDate, page: $page, perPage: $perPage) {
      hasPrevious,
      hasNext,
      pages,
      MeetingsDurationaAnalytics {
        roomName
        count
        totalDuration
      }
    }
  }
`;

export { MEETING_DURATION_ANALYTICS as default };
