export const meetingDurationAnalytics = meetings => meetings.map(({
  roomName,
  events: [{ durationInMinutes }],
  numberOfBookings,
}) => ({
  roomName, totalDuration: durationInMinutes, count: numberOfBookings,
}));

export default meetingDurationAnalytics;
