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

const ANALYTICS_BOOKINGS_COUNT = gql`
  query AnalyticsBookingsCount($startDate: String!, $endDate: String!){
    bookingsAnalyticsCount(startDate: $startDate, endDate: $endDate){
      period
      bookings
    }
  }
`;

const CHECKINS_BOOKINGS_CANCELLATIONS_PERCENTAGES = gql`
  query AnalyticsRatiosTotal($startDate: String!, $endDate: String!){
    analyticsRatios(startDate: $startDate, endDate: $endDate){
      checkins
      checkinsPercentage
      bookings
      cancellations
      cancellationsPercentage
    }
  }
`;

export {
  MEETING_DURATION_ANALYTICS as default,
  ANALYTICS_BOOKINGS_COUNT,
  CHECKINS_BOOKINGS_CANCELLATIONS_PERCENTAGES,
};
