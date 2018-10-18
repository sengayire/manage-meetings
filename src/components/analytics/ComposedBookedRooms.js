import React from 'react';
import BookedRoomsHOC from './BookedRoomsHOC';
import BookedRooms from './BookedRooms';
import '../../assets/styles/composed-rooms.scss';

const MostBookedRooms = BookedRoomsHOC(BookedRooms, 'Most Booked Rooms');
const LeastBookedRooms = BookedRoomsHOC(BookedRooms, 'Least Booked Rooms');
const ComposedBookedRooms = () => (
  <div className="wrap-composed-rooms">
    <div>{<MostBookedRooms />}</div>
    <div id="booked-room-margin">{<LeastBookedRooms />}</div>
  </div>
);
export default ComposedBookedRooms;
