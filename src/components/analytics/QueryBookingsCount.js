import React from 'react';
import { Query } from 'react-apollo';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { HorizontalBar } from 'react-chartjs-2';

import { ANALYTICS_BOOKINGS_COUNT } from '../../graphql/queries/analytics';
import bookings from '../../fixtures/bookings';


const QueryBookingsCount = () => (
  <Query query={ANALYTICS_BOOKINGS_COUNT}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <tr>
            <th colSpan="3">
              <ProgressBar type="linear" mode="indeterminate" />
            </th>
          </tr>
        );
      }
      // if (error) {
      //   return (
      //     <p>Error...</p>
      //   );
      // }

      // const { bookingsData } = data.analyticsRatios;
      const bookingsData = bookings;

      const options = {
        maintainAspectRatio: false,
      };

      const graphData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Bookings',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: bookingsData.map(item => item.period),
          },
        ],
      };

      return (
        <HorizontalBar data={graphData} options={options} height={210} />
      );
    }}
  </Query>
);

export default QueryBookingsCount;
