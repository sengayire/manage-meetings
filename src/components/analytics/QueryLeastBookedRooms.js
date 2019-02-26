import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { LEAST_BOOKED_ROOMS_ANALYTICS } from '../../graphql/queries/analytics';
import RedPollIcon from '../../assets/images/poll_red.svg';
import BookedRooms from './BookedRooms';

/**
 * Component for Least Booked Rooms
 *
 * @param {Object} dateValue
 *
 * @returns {JSX}
 */
const QueryLeastBookedRooms = ({ dateValue }) => (
  <Query
    query={LEAST_BOOKED_ROOMS_ANALYTICS}
    variables={dateValue}
    notifyOnNetworkStatusChange={true} // eslint-disable-line
  >
    {({ loading, error, data }) => {
      let bookedRoomsList = [];

      if (!loading && !error) {
        const { analytics } = data.analyticsForLeastBookedRooms;
        bookedRoomsList = analytics;
      }

      return (
        <BookedRooms
          pollIcon={RedPollIcon}
          tip="The least number of times meeting rooms were booked in a set time period"
          bookedRoomText="Least Booked Rooms"
          fetching={loading}
          error={error}
          bookedRoomsList={bookedRoomsList}
        />
      );
    }}
  </Query>
);

QueryLeastBookedRooms.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
};

export default QueryLeastBookedRooms;
