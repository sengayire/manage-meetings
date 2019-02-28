/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import TableHead from '../helpers/TableHead';
import '../../assets/styles/bookedroom.scss';
import Tip from '../commons/Tooltip';
import ErrorIcon from '../commons/ErrorIcon';

/**
 *
 * Component for showing booked rooms
 *
 * @param {Object} bookedRoomsObject
 *
 * @returns {JSX}
 */
const BookedRooms = ({
  pollIcon, bookedRoomText, bookedRoomsList, fetching, error, tip,
}) => (
  <div className="wrap-booked-room">
    <div className="booked-room-header">
      <img src={pollIcon} alt="Pull" />
      <h4>{bookedRoomText}</h4>
      {Tip(tip)}
    </div>
    <div className="booked-room-list">
      <div className="table">
        <TableHead titles={['Room', 'Meetings', '% Share of All Meetings']} />
        {error !== null && Object.values(error).length > 0 ? (
          <div className="table__body">
            <div className="table__row--analytics">
              <ErrorIcon />
            </div>
          </div>
        ) : (
          <div className="table__body">
            {!fetching ? (
              bookedRoomsList.map((room, index) => (
                <div className="table__row--analytics" key={index}>
                  <span>{room.roomName}</span>
                  <span>{room.meetings}</span>
                  <span>{room.percentage}%</span>
                </div>
              ))
            ) : (
              <div className="table__row--loading">
                <ProgressBar type="linear" mode="indeterminate" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

BookedRooms.propTypes = {
  pollIcon: PropTypes.string.isRequired,
  bookedRoomText: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  bookedRoomsList: PropTypes.instanceOf(Array).isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
  }),
};

BookedRooms.defaultProps = {
  error: {},
};

export default BookedRooms;
