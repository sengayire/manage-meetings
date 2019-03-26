import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import { ANALYTICS_BOOKINGS_COUNT } from '../../graphql/queries/analytics';
import ErrorBoundary from '../commons/ErrorBoundary';
import graphColor from '../../fixtures/graphColor';
import Spinner from '../commons/Spinner';
import ErrorIcon from '../../components/commons/ErrorIcon';

/**
 * Component for Querying Bookings Count
 *
 * @param {Object} dateValueObject
 *
 * @returns {JSX}
 */
const QueryBookingsCount = ({ dateValue, updateParent }) => (
  <Query
    query={ANALYTICS_BOOKINGS_COUNT}
    variables={dateValue}
    notifyOnNetworkStatusChange={true} // eslint-disable-line
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return (<ErrorIcon
          message={error.graphQLErrors.length > 0 && error.graphQLErrors[0].message}
        />);
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
      updateParent('totalBookingsCount', bookings);
      return (
        <div>
          <ErrorBoundary>
            <HorizontalBar data={graphData} options={options} height={300} />
          </ErrorBoundary>
        </div>
      );
    }}
  </Query>
);

QueryBookingsCount.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
  updateParent: PropTypes.func,
};

QueryBookingsCount.defaultProps = {
  updateParent: null,
};

export default QueryBookingsCount;
