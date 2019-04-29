import React from 'react';
import { PropTypes } from 'prop-types';
import '../../assets/styles/composed-rooms.scss';
import { QueryMostBookedRooms } from './QueryMostBookedRooms';
import { QueryLeastBookedRooms } from './QueryLeastBookedRooms';

/**
 * Component for composed booked rooms
 *
 * @param {object} dateValueObject
 *
 * @returns {JSX}
 */
const ComposedBookedRooms = ({ dateValue, updateParent }) => (
  <div className="wrap-composed-rooms">
    <div className="query-booked-rooms">
      {
        <QueryMostBookedRooms
          dateValue={dateValue}
          updateParent={updateParent}
        />
      }
    </div>
    <div id="booked-room-margin" className="query-booked-rooms">
      {
        <QueryLeastBookedRooms
          dateValue={dateValue}
          updateParent={updateParent}
        />
      }
    </div>
  </div>
);
ComposedBookedRooms.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  updateParent: PropTypes.func,
};

ComposedBookedRooms.defaultProps = {
  dateValue: {},
  updateParent: null,
};
export default ComposedBookedRooms;
