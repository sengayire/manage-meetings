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

const MOST_BOOKED_ROOMS_ANALYTICS = gql`
  query analyticsForMostBookedRooms($startDate: String!, $endDate: String!){
    analyticsForMostBookedRooms(startDate: $startDate, endDate: $endDate){
      analytics{
        roomName
        meetings
        percentage
      }
    }
  }
`;

const LEAST_BOOKED_ROOMS_ANALYTICS = gql`
  query analyticsForLeastBookedRooms($startDate: String!, $endDate: String!){
    analyticsForLeastBookedRooms(startDate: $startDate, endDate: $endDate){
      analytics{
        roomName
        meetings
        percentage
      }
    }
  }
`;

export {
  MEETING_DURATION_ANALYTICS as default,
  ANALYTICS_BOOKINGS_COUNT,
  CHECKINS_BOOKINGS_CANCELLATIONS_PERCENTAGES,
  MOST_BOOKED_ROOMS_ANALYTICS,
  LEAST_BOOKED_ROOMS_ANALYTICS,
};
