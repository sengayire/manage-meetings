import React from 'react';
import { PropTypes } from 'prop-types';
import BookedRoomsHOC from './BookedRoomsHOC';
import BookedRooms from './BookedRooms';
import '../../assets/styles/composed-rooms.scss';

const ComposedBookedRooms = ({ dateValue }) => (
  <div className="wrap-composed-rooms">
    <div>
      {
        <BookedRoomsHOC
          bookedRoomText="Most Booked Rooms"
          component={BookedRooms}
          date={dateValue}
        />
      }
    </div>
    <div id="booked-room-margin">
      {
        <BookedRoomsHOC
          bookedRoomText="Least Booked Rooms"
          tip=""
          component={BookedRooms}
          date={dateValue}
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
};

ComposedBookedRooms.defaultProps = {
  dateValue: {},
};
export default ComposedBookedRooms;
