import React from 'react';
import { PropTypes } from 'prop-types';
import '../../assets/styles/composed-rooms.scss';
import QueryMostBookedRooms from './QueryMostBookedRooms';
import QueryLeastBookedRooms from './QueryLeastBookedRooms';

/**
 * Component for composed booked rooms
 *
 * @param {object} dateValueObject
 *
 * @returns {JSX}
 */
const ComposedBookedRooms = ({ dateValue }) => (
  <div className="wrap-composed-rooms">
    <div>
      {
        <QueryMostBookedRooms dateValue={dateValue} />
      }
    </div>
    <div id="booked-room-margin">
      {
        <QueryLeastBookedRooms dateValue={dateValue} />
      }
    </div>
  </div>
);
ComposedBookedRooms.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
};

ComposedBookedRooms.defaultProps = {
  dateValue: {},
};
export default ComposedBookedRooms;
