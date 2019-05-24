/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '../helpers/TableHead';
import '../../assets/styles/bookedroom.scss';
import { pollRed } from '../../utils/images/images';
import Tip from '../commons/Tooltip';
import ErrorIcon from '../commons/ErrorIcon';
import Overlay from '../commons/Overlay';

/**
 *
 * Component for showing booked rooms
 *
 * @param {Object} bookedRoomsObject
 *
 * @returns {JSX}
 */
const BookedRooms = ({
  bookedRoomText, bookedRoomsList, fetching, tip,
}) => (
  <div className="wrap-booked-room overlay-container">
    {fetching && <Overlay />}
    <div className="booked-room-header">
      <img src={pollRed} alt="Pull" />
      <h4>{bookedRoomText}</h4>
      {Tip(tip)}
    </div>
    <div className="booked-room-list">
      <div className="table">
        <TableHead titles={['Room', 'Meetings', '% Share of All Meetings']} />
        {bookedRoomsList.length === 0 && !fetching ? (
          <div className="table__body">
            {<ErrorIcon message={bookedRoomsList.length === 0 && 'No resource found'} />}
          </div>
        ) : (
          <div className="table__body">
            {
              (fetching ? [{
                roomName: 'Room name',
                meetings: 'Meetings',
                percentage: '',
              }] : bookedRoomsList).map((room, index) => (
                <div className="table__row--analytics" key={index}>
                  <span>{room.roomName}</span>
                  <span>{room.numberOfBookings}</span>
                  <span>{Math.round(room.bookingsPercentageShare)}%</span>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  </div>
);

BookedRooms.propTypes = {
  bookedRoomText: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  bookedRoomsList: PropTypes.instanceOf(Array),
  fetching: PropTypes.bool.isRequired,
};

BookedRooms.defaultProps = {
  bookedRoomsList: [],
};
export default BookedRooms;
