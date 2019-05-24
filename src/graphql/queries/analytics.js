import gql from 'graphql-tag';

const ALL_ANALYTICS = gql`
  query allAnalytics($startDate: String!, $endDate: String!) {
    allAnalytics(startDate: $startDate, endDate: $endDate){
      bookingsCount{
        totalBookings 
        period
        }
      checkinsPercentage
      appBookingsPercentage
      cancellationsPercentage
      autoCancellationsPercentage
      analytics{
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
        events{
          durationInMinutes
          }
      }
    }
  }
`;

export const ANALYTICS_FOR_DAILY_ROOM_EVENTS = gql`
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
          cancelled
        }
      }
    }
  }
`;


export default ALL_ANALYTICS;
