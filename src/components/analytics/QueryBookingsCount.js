import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';

import { ANALYTICS_BOOKINGS_COUNT } from '../../graphql/queries/analytics';
import ErrorBoundary from '../commons/ErrorBoundary';
import graphColor from '../../fixtures/graphColor';


const QueryBookingsCount = ({ dateValue }) => (
  <Query
    query={
    ANALYTICS_BOOKINGS_COUNT}
    variables={dateValue}
    notifyOnNetworkStatusChange={true} // eslint-disable-line
  >
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <p>Loading...</p>
        );
      }
      if (error) {
        const errors = error.graphQLErrors.map(err => err.message);
        return (
          <p>{ errors }</p>
        );
      }

      const bookings = data.bookingsAnalyticsCount;

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
            data: bookings.map(item => item.bookings),
          },
        ],
      };

      return (
        <ErrorBoundary >
          <HorizontalBar
            data={graphData}
            options={options}
            height={300}
          />
        </ErrorBoundary>
      );
    }}
  </Query>
);

QueryBookingsCount.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
};

export default QueryBookingsCount;
