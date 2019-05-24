import React, { useContext } from 'react';
import '../../../assets/styles/checkins.scss';
import DonutChart from './DonutChart';
import {
  checkinsChart,
  bookingsChart,
  cancellationsChart,
} from '../../../fixtures/donutChartColors';
import AnalyticsContext from '../../helpers/AnalyticsContext';
import getCheckinsStatistics from '../../helpers/analytics/Checkins';

export const Checkins = () => {
  const { analytics, fetching } = useContext(AnalyticsContext);

  const {
    autoCancellationsPercentage,
    checkinsPercentage,
    appBookingsPercentage,
  } = analytics || {};

  let bookings;
  let checkins;
  let autoCancellations;
  let appBookings;

  if (!fetching) {
    ({
      bookings, checkins, autoCancellations, appBookings,
    } = getCheckinsStatistics(analytics));
  }

  const roundNumber = num => Math.round(num);


  return (
    <div className="checkins">
      <DonutChart
        chartTitle="% of Checkins"
        entries={checkins}
        total={bookings}
        percentage={roundNumber(checkinsPercentage)}
        loading={fetching}
        chartColor={checkinsChart}
        dataName="Checkins"
        tip="The number and % of check-ins of booked meeting rooms"
      />
      <DonutChart
        chartTitle="% of App Bookings"
        entries={appBookings}
        total={bookings}
        percentage={roundNumber(appBookingsPercentage)}
        loading={fetching}
        chartColor={bookingsChart}
        dataName="Bookings"
        tip="The number and % of people who book directly from the app instead from google calendar"
      />
      <DonutChart
        chartTitle="% of Auto Cancellations"
        entries={autoCancellations}
        total={bookings}
        percentage={roundNumber(autoCancellationsPercentage)}
        loading={fetching}
        chartColor={cancellationsChart}
        dataName="Cancellations"
        tip="Number and % of auto-cancelled meeting rooms"
      />
    </div>
  );
};

export default Checkins;
