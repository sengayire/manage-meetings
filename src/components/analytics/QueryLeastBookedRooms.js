import React, { useContext } from 'react';
import BookedRooms from './BookedRooms';
import AnalyticsContext from '../helpers/AnalyticsContext';

export const QueryLeastBookedRooms = () => {
  const { analytics, fetching } = useContext(AnalyticsContext);
  return (
    <div>
      <BookedRooms
        tip="The least number of times meeting rooms were booked in a set time period"
        bookedRoomText="Least Booked Rooms"
        fetching={fetching}
        bookedRoomsList={fetching ? undefined : analytics.analytics.slice(-4).reverse()}
      />
    </div>
  );
};

export default QueryLeastBookedRooms;
