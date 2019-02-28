import React from 'react';
import PropTypes from 'prop-types';
import EditRoomFunc from './EditRoom';
import DeleteRoomComponent from './DeleteRoom';

/**
 * Shows the room component
 *
 * @param {Object} room
 *
 * @returns {JSX}
 */
const Room = ({
  room: {
    name, location, office, locationId, id,
  },
  locations,
  currentPage,
  refetch,
}) => (
  <div className="table__row">
    <span>{name}</span>
    <span>{location}</span>
    <span>{office}</span>
    <span>
      <EditRoomFunc
        roomName={name}
        roomLocation={locationId}
        locations={locations}
        roomId={id}
        currentPage={currentPage}
        refetch={refetch}
      />{' '}
      &nbsp;
      <DeleteRoomComponent
        roomName={name}
        id="delete-modal"
        roomId={id}
        currentPage={currentPage}
        refetch={refetch}
      />
    </span>
  </div>
);

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    locationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ).isRequired,
  currentPage: PropTypes.number,
  refetch: PropTypes.func,
};

Room.defaultProps = {
  currentPage: null,
  refetch: null,
};

export default Room;
