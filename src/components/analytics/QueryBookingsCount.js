import React, { useContext } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import ErrorBoundary from '../commons/ErrorBoundary';
import graphColor from '../../fixtures/graphColor';
import ErrorIcon from '../../components/commons/ErrorIcon';
import Overlay from '../commons/Overlay';
import AnalyticsContext from '../helpers/AnalyticsContext';

const QueryBookingsCount = () => {
  const { fetching, analytics } = useContext(AnalyticsContext);
  const bookings = fetching
    ? [{ totalBookings: 10, period: 'Apr 30 2019' }]
    : analytics.bookingsCount;

  if (analytics === null) {
    return <ErrorIcon message="No resource found" />;
  }

  const options = {
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: false,
  };

  const graphData = {
    labels: bookings.map(item => item.period),
    datasets: [
      {
        label: 'Bookings',
        backgroundColor: graphColor,
        hoverBackgroundColor: graphColor,
        data: bookings.map(item => item.totalBookings),
      },
    ],
  };
  return (
    <div>
      {fetching && <Overlay />}
      <ErrorBoundary>
        <HorizontalBar data={graphData} options={options} height={300} />
      </ErrorBoundary>
    </div>
  );
};

export default QueryBookingsCount;
