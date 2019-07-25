import gql from 'graphql-tag';

const ALL_ANALYTICS = gql`
  query allAnalytics($startDate: String!, $endDate: String!, $locationId: Int!) {
    allAnalytics(startDate: $startDate, endDate: $endDate, locationId: $locationId) {
      bookingsCount {
        totalBookings
        period
      }
      checkinsPercentage
      appBookingsPercentage
      cancellationsPercentage
      autoCancellationsPercentage
      analytics {
        roomName
        cancellations
        cancellationsPercentage
        autoCancellations
        numberOfBookings
        checkins
        checkinsPercentage
        bookingsPercentageShare
        appBookings
        appBookingsPercentage
        events {
          durationInMinutes
        }
      }
    }
  }
`;

export const ANALYTICS_FOR_DAILY_ROOM_EVENTS = gql`
  query allEvents($startDate: String!, $endDate: String!, $page: Int, $perPage: Int) {
    allEvents(startDate: $startDate, endDate: $endDate, page: $page, perPage: $perPage) {
        events {
        room {
          name
        }
        eventTitle
        endTime
        checkedIn
        startTime
        checkInTime
        endTime
        cancelled
        numberOfParticipants
      }
      pages
      queryTotal
      hasNext
      hasPrevious
    }
  }
`;

export default ALL_ANALYTICS;
