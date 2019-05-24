import GetPercentage from './GetPercentage';

/**
 * Calculates the width of each sectors in the pie chart
 *
 * @param {Array} MeetingsDurationAnalytics - An array of all the meting durations
 * for the date range selected
 * @returns {Array} - Array of various sector widths to be used by the pie chart
 */
const getSectorWidths = (MeetingsDurationAnalytics) => {
  const durations = Array.from(
    MeetingsDurationAnalytics,
    ({
      events: [{ durationInMinutes }],
      numberOfBookings,
    }) => {
      if (numberOfBookings === 0) {
        return 0;
      }
      return durationInMinutes / numberOfBookings;
    },
  );
  let greaterThan60 = 0;
  let between45And60 = 0;
  let between30And45 = 0;
  let between1And29 = 0;
  let zero = 0;
  durations.forEach((duration) => {
    if (duration > 60) greaterThan60 += 1;
    if (duration > 45 && duration <= 60) between45And60 += 1;
    if (duration > 29 && duration <= 45) between30And45 += 1;
    if (duration > 0 && duration <= 29) between1And29 += 1;
    if (duration === 0) zero += 1;
  });
  greaterThan60 = GetPercentage(greaterThan60, durations.length);
  between45And60 = GetPercentage(between45And60, durations.length);
  between30And45 = GetPercentage(between30And45, durations.length);
  between1And29 = GetPercentage(between1And29, durations.length);
  zero = GetPercentage(zero, durations.length);
  return [greaterThan60, between45And60, between30And45, between1And29, zero];
};

export default getSectorWidths;
