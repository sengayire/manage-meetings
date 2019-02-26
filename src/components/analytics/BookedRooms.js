/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import TableHead from '../helpers/TableHead';
import '../../assets/styles/bookedroom.scss';
import Warning from '../../assets/images/warning_icon.svg';
import Tip from '../commons/Tooltip';

/**
 *
 * Component for showing booked rooms
 *
 * @param {Object} bookedRoomsObject
 *
 * @returns {JSX}
 */
const BookedRooms = ({
  pollIcon,
  bookedRoomText,
  bookedRoomsList,
  fetching,
  error,
  tip,
}) => (
  <div className="wrap-booked-room">
    <div className="booked-room-header">
      <img src={pollIcon} alt="Pull" />
      <h4>{bookedRoomText}</h4>
      {Tip(tip)}
    </div>
    <div className="booked-room-list">
      <table>
        <TableHead titles={['Room', 'Meetings', '% Share of All Meetings']} />
        {error !== null && Object.values(error).length > 0 ? (
          <tbody>
            <tr>
              <td className="error_class">
                <img
                  className="error_icon"
                  src={Warning}
                  alt="error_icon"
                />
                <b>
                  <p className="error_msg">
                  An error occurred, cannot fetch data
                  </p>
                </b>
              </td>
            </tr>
          </tbody>
          ) : (
            <tbody>
              {!fetching ? (
                bookedRoomsList.map((room, index) => (
                  <tr key={index}>
                    <td>{room.roomName}</td>
                    <td>{room.meetings}</td>
                    <td>{room.percentage}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    <ProgressBar type="linear" mode="indeterminate" />
                  </td>
                </tr>
              )}
            </tbody>
          )}
      </table>
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
