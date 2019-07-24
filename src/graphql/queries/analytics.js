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
  query allEvents($startDate: String!, $endDate: String!) {
    allEvents(startDate: $startDate, endDate: $endDate) {
      DailyRoomEvents{
        day
        events {
          room{
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
      }
    }
  }
`;

export default ALL_ANALYTICS;
