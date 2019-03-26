const mockDataForAnalytics = {
  checkinsAndCancellations: {
    bookings: 42,
    cancellations: 0,
    cancellationsPercentage: 0,
    checkins: 0,
    checkinsPercentage: 0,
  },
  averageMeetingDuration: [
    0, 0, 0, 0,
  ],
  averageMeetingTime: {
    MeetingsDurationaAnalytics: [
      {
        roomName: 'Test 1',
        count: 4,
        totalDuration: 25,
      },
      {
        roomName: 'Test 2',
        count: 1,
        totalDuration: 50,
      },
      {
        roomName: 'Test 3',
        count: 1,
        totalDuration: 35,
      },
      {
        roomName: 'Test 4',
        count: 1,
        totalDuration: 2440,
      },
    ],
  },
  mostBookedRooms: [
    {
      meetings: 7,
      percentage: 100,
      roomName: 'Moroto',
    },
  ],
  leastBookedRooms: [
    {
      meetings: 1,
      percentage: 100,
      roomName: 'Moroto B',
    },
  ],
  roomCapacity:
    {
      lessThanTenData: 96,
      betweenTenandTwentyData: 4,
      greaterThanTwentyData: 0,
    },
  totalBookingsCount: [
    { period: 'Mar 18 2019', bookings: 17 },
    { period: 'Mar 17 2019', bookings: 14 },
  ],
};
export default mockDataForAnalytics;
