import React from 'react';
import PropTypes from 'prop-types';
import EditRoom from './rooms/EditRoom';
import DeleteRoomComponent from './DeleteRoom';

const Room = ({
  room: {
    name, location, office, locationId, id,
  }, locations,
}) => (
  <tr>
    <td>{name}</td>
    <td>{location}</td>
    <td>{office}</td>
    <td>
      <EditRoom roomName={name} roomLocation={locationId} locations={locations} /> &nbsp;
      <DeleteRoomComponent roomName={name} id="delete-modal" roomId={id} />
    </td>
  </tr>
);

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    locationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  })).isRequired,
};

export default Room;
