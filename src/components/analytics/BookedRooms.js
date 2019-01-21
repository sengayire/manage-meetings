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
        {Tip(tip)}
      </div>
      <div className="booked-room-list">
        <table>
          <TableHead titles={['Room', 'Meetings', '% Share of All Meetings']} />
          {!fetching && error === null ? (
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
              {error !== null ? (
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
};

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
