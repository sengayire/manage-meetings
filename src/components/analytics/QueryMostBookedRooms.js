import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { MOST_BOOKED_ROOMS_ANALYTICS } from '../../graphql/queries/analytics';
import { pollRedIcon } from '../../utils/images/images';
import BookedRooms from './BookedRooms';


/**
 * Component for Most Booked Rooms
 *
 * @param {Object} props.dateValue
 *
 * @returns {JSX}
 */
const QueryMostBookedRooms = props => (
  <Query
    query={MOST_BOOKED_ROOMS_ANALYTICS}
    variables={props.dateValue}
    notifyOnNetworkStatusChange={true} // eslint-disable-line
  >
    {({ loading, error, data }) => {
      let bookedRoomsList = [];

      if (!loading && !error) {
        const { analytics } = data.analyticsForBookedRooms;
        bookedRoomsList = analytics;
        props.updateParent('mostBookedRooms', bookedRoomsList);
      }

      return (
        <Fragment>
          <BookedRooms
            pollIcon={pollRedIcon}
            tip="The highest number of times meeting rooms were booked in a set time period"
            bookedRoomText="Most Booked Rooms"
            fetching={loading}
            error={error}
            bookedRoomsList={bookedRoomsList}
          />
        </Fragment>
      );
    }}
  </Query>
);

QueryMostBookedRooms.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
  updateParent: PropTypes.func,
};

QueryMostBookedRooms.defaultProps = {
  updateParent: null,
};

export default QueryMostBookedRooms;
