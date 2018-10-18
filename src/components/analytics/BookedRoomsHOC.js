import React from 'react';
import PollIcon from '../../assets/images/poll.svg';
import RedPollIcon from '../../assets/images/poll_red.svg';
import MoreIcon from '../../assets/images/more.svg';
import leastBookedRooms from '../../fixtures/leastBookedRooms';
import mostBookedRooms from '../../fixtures/mostBookedRooms';


export default (ComposedBookedRooms, bookedRoomText) => () => {
  if (bookedRoomText === 'Most Booked Rooms') {
    return (
      <ComposedBookedRooms
        pollIcon={PollIcon}
        moreIcon={MoreIcon}
        bookedRoomText={bookedRoomText}
        bookedRoomsList={mostBookedRooms}
      />
    );
  }
  return (
    <ComposedBookedRooms
      pollIcon={RedPollIcon}
      moreIcon={MoreIcon}
      bookedRoomText={bookedRoomText}
      bookedRoomsList={leastBookedRooms}
    />
  );
};
