import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '../helpers/TableHead';
import '../../assets/styles/bookedroom.scss';

const BookedRooms = ({
  pollIcon, moreIcon, bookedRoomText, bookedRoomsList,
}) => (
  <div className="wrap-booked-room">
    <div className="booked-room-header">
      <img src={pollIcon} alt="Pull" />
      <h4>{bookedRoomText}</h4>
      <img src={moreIcon} alt="More" className="" />
    </div>
    <div className="booked-room-list">
      <table>
        <TableHead titles={['Room', 'Meetings', '% Share of All Meetings']} />
        <tbody>
          {bookedRoomsList.map(bookedRoom => (
            <tr key={bookedRoom.id} id="booked-room-body">
              <td>{bookedRoom.name}</td>
              <td>{bookedRoom.meeting}</td>
              <td>{bookedRoom.shareOfAllMeeting}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

BookedRooms.propTypes = {
  pollIcon: PropTypes.string.isRequired,
  moreIcon: PropTypes.string.isRequired,
  bookedRoomText: PropTypes.string.isRequired,
  bookedRoomsList: PropTypes.instanceOf(Array).isRequired,
};
export default BookedRooms;
