import React from 'react';
import PropTypes from 'prop-types';
import EditRoomFunc from './rooms/EditRoom';
import DeleteRoomComponent from './DeleteRoom';

const Room = ({
  room: {
    name, location, office, locationId, id,
  }, locations, currentPage, refetch,
}) => (
  <tr>
    <td>{name}</td>
    <td>{location}</td>
    <td>{office}</td>
    <td>
      <EditRoomFunc
        roomName={name}
        roomLocation={locationId}
        locations={locations}
        roomId={id}
        currentPage={currentPage}
        refetch={refetch}
      /> &nbsp;
      <DeleteRoomComponent
        roomName={name}
        id="delete-modal"
        roomId={id}
        currentPage={currentPage}
        refetch={refetch}
      />
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
  currentPage: PropTypes.number,
  refetch: PropTypes.func,
};

Room.defaultProps = {
  currentPage: null,
  refetch: null,
};

export default Room;
