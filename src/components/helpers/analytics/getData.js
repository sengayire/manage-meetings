import { useState } from 'react';

import dateUtils from '../../../utils/dateUtils';

export const bookingData = () => {
  const usedRoomsStartDate = useState(dateUtils.oneWeekAgo);
  const mostBookedRoomsStartDate = useState(dateUtils.oneWeekAgo);
  const leastBookedRoomsStartDate = useState(dateUtils.oneWeekAgo);

  return {
    usedRoomsStartDate,
    mostBookedRoomsStartDate,
    leastBookedRoomsStartDate,
  };
};
export const getAnalyticsData = ({ allAnalytics }) => {
  const { analytics } = allAnalytics || {};
  (analytics || []).sort((analyticA, analyticB) => {
    const numberOfBookingsA = analyticA.numberOfBookings;
    const numberOfBookingsB = analyticB.numberOfBookings;
    return (
      (numberOfBookingsA < numberOfBookingsB && 1) ||
      (numberOfBookingsA > numberOfBookingsB && -1) ||
      0
    );
  });

  let [
    totalDurationInMinutes,
    totalCheckins,
    totalCancellations,
    totalAutoCancellations,
    totalBookingsPercentageShare,
  ] = [0, 0, 0, 0, 0];

  (analytics || []).forEach(
    ({
      events, checkins, cancellations, autoCancellations, bookingsPercentageShare,
    }) => {
      events.forEach(({ durationInMinutes }) => {
        totalDurationInMinutes += durationInMinutes;
      });
      totalCheckins += checkins;
      totalCancellations += cancellations;
      totalAutoCancellations += autoCancellations;
      totalBookingsPercentageShare += bookingsPercentageShare;
    },
  );
  return {
    analytics,
    roomNumber: (analytics || []).length || 1,
    totalDurationInMinutes,
    totalCheckins,
    totalCancellations,
    totalAutoCancellations,
    totalBookingsPercentageShare,
  };
};
