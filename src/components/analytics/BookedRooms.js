import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import TableHead from '../helpers/TableHead';
import '../../assets/styles/bookedroom.scss';

const BookedRooms = ({
  pollIcon,
  moreIcon,
  bookedRoomText,
  bookedRoomsList,
  fetching,
}) => {
  const rooms = bookedRoomsList.length ? Object.values(bookedRoomsList[0]) : [];
  const meetings = bookedRoomsList.length
    ? Object.values(bookedRoomsList[1])
    : [];
  const meetingShares = bookedRoomsList.length
    ? Object.values(bookedRoomsList[2])
    : [];

  return (
    <div className="wrap-booked-room">
      <div className="booked-room-header">
        <img src={pollIcon} alt="Pull" />
        <h4>{bookedRoomText}</h4>
        <img src={moreIcon} alt="More" className="" />
      </div>
      <div className="booked-room-list">
        <table>
          <TableHead titles={['Room', 'Meetings', '% Share of All Meetings']} />
          {!fetching ? (
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room}>
                  <td>{room}</td>
                  <td>{meetings[index]}</td>
                  <td>{meetingShares[index]}%</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="3">
                  <ProgressBar type="linear" mode="indeterminate" />
                </td>
              </tr>
            </tbody>
            )}
        </table>
      </div>
    </div>
  );
};

BookedRooms.propTypes = {
  pollIcon: PropTypes.string.isRequired,
  moreIcon: PropTypes.string.isRequired,
  bookedRoomText: PropTypes.string.isRequired,
  bookedRoomsList: PropTypes.instanceOf(Array).isRequired,
  fetching: PropTypes.bool.isRequired,
};
export default BookedRooms;
