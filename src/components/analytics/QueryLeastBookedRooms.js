import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { LEAST_BOOKED_ROOMS_ANALYTICS } from '../../graphql/queries/analytics';
import BookedRooms from './BookedRooms';

/**
 * Component for Least Booked Rooms
 *
 * @param {Object} dateValue
 *
 * @returns {JSX}
 */
const QueryLeastBookedRooms = ({ dateValue, updateParent }) => (
  <Query
    query={LEAST_BOOKED_ROOMS_ANALYTICS}
    variables={dateValue}
    notifyOnNetworkStatusChange={true} // eslint-disable-line
  >
    {({ loading, error = {}, data }) => {
      let bookedRoomsList = [];
      if (!loading && !error) {
        const { analytics } = data.analyticsForBookedRooms;
        bookedRoomsList = analytics;
        updateParent('leastBookedRooms', bookedRoomsList);
      }
      return (
        <div>
          <BookedRooms
            tip="The least number of times meeting rooms were booked in a set time period"
            bookedRoomText="Least Booked Rooms"
            fetching={loading}
            error={error}
            bookedRoomsList={bookedRoomsList}
          />
        </div>
      );
    }}
  </Query>
);

QueryLeastBookedRooms.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
  updateParent: PropTypes.func,
};

QueryLeastBookedRooms.defaultProps = {
  updateParent: null,
};
export default QueryLeastBookedRooms;
