import { getRawAmountFromPercentage } from './GetPercentage';

const getCheckinsStatistics = ({
  autoCancellationsPercentage,
  checkinsPercentage,
  appBookingsPercentage,
  analytics,
}) => {
  const bookings = analytics.reduce((total, { numberOfBookings }) =>
    total + numberOfBookings, 0);

  return {
    bookings,
    checkins: getRawAmountFromPercentage(bookings, checkinsPercentage),
    autoCancellations: getRawAmountFromPercentage(bookings, autoCancellationsPercentage),
    appBookings: getRawAmountFromPercentage(bookings, appBookingsPercentage),
  };
};

export default getCheckinsStatistics;
