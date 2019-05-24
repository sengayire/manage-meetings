import React from 'react';
import '../../assets/styles/composed-rooms.scss';
import { QueryMostBookedRooms } from './QueryMostBookedRooms';
import { QueryLeastBookedRooms } from './QueryLeastBookedRooms';

const ComposedBookedRooms = () => (
  <div className="wrap-composed-rooms">
    <div className="query-booked-rooms">
      <QueryMostBookedRooms />
    </div>
    <div id="booked-room-margin" className="query-booked-rooms">
      <QueryLeastBookedRooms />
    </div>
  </div>
);

export default ComposedBookedRooms;
