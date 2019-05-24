export const getMeetingDurationAnalytics = meetings => meetings.map(({
  roomName,
  events: [{ durationInMinutes }],
  numberOfBookings,
}) => ({
  roomName, totalDuration: durationInMinutes, count: numberOfBookings,
}));

const getAnalyticsForMeetingDuration = (analytics, currentPage, perPage = 5) => {
  const { analytics: rooms } = analytics;
  const startingPoint = (currentPage - 1) * perPage;
  const endingPoint = startingPoint + perPage;
  const pageContent = rooms.slice(startingPoint, endingPoint);
  const pages = Math.ceil(rooms.length / perPage);

  return {
    meetingDurationAnalytics: getMeetingDurationAnalytics(pageContent),
    pages,
    hasNext: pages >= currentPage,
    hasPrevious: currentPage !== 1,
  };
};

export default getAnalyticsForMeetingDuration;
