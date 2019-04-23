import gql from 'graphql-tag';

const MEETING_DURATION_ANALYTICS = gql`
  query durationOfMeetingsPerMeetingRoom(
    $startDate: String!
    $endDate: String!
    $page: Int
    $perPage: Int
  ) {
    analyticsForMeetingsDurations(
      startDate: $startDate
      endDate: $endDate
      page: $page
      perPage: $perPage
    ) {
      hasPrevious
      hasNext
      pages
      MeetingsDurationaAnalytics {
        roomName
        count
        totalDuration
      }
    }
  }
`;

const ANALYTICS_BOOKINGS_COUNT = gql`
  query AnalyticsBookingsCount($startDate: String!, $endDate: String!) {
    bookingsAnalyticsCount(startDate: $startDate, endDate: $endDate) {
      period
      bookings
    }
  }
`;

const CHECKINS_BOOKINGS_CANCELLATIONS_PERCENTAGES = gql`
  query AnalyticsRatiosTotal($startDate: String!, $endDate: String!) {
    analyticsRatios(startDate: $startDate, endDate: $endDate) {
      checkins
      checkinsPercentage
      bookings
      cancellations
      cancellationsPercentage
    }
  }
`;

const MOST_BOOKED_ROOMS_ANALYTICS = gql`
  query analyticsForMostBookedRooms($startDate: String!, $endDate: String!) {
    analyticsForBookedRooms(
      startDate: $startDate
      endDate: $endDate
      limit: 10
      criteria: "most_booked"
    ) {
      analytics {
        roomName
        meetings
        percentage
      }
    }
  }
`;

const LEAST_BOOKED_ROOMS_ANALYTICS = gql`
  query analyticsForLeastBookedRooms($startDate: String!, $endDate: String!) {
    analyticsForBookedRooms(
      startDate: $startDate
      endDate: $endDate
      limit: 10
      criteria: "least_booked"
    ) {
      analytics {
        roomName
        meetings
        percentage
      }
    }
  }
`;

const ANALYTICS_FOR_DAILY_ROOM_EVENTS = gql`
  query analyticsForDailyRoomEvents($startDate: String!, $endDate: String!) {
    analyticsForDailyRoomEvents(startDate: $startDate, endDate: $endDate) {
      DailyRoomEvents {
        day
        events {
          eventSummary
          startTime
          endTime
          eventId
          noOfParticipants
          roomName
        }
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
  ANALYTICS_FOR_DAILY_ROOM_EVENTS,
};
