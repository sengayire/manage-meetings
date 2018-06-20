import React from 'react';
import PropTypes from 'prop-types';

const Room = ({ room: { name, location, office } }) => (
  <tr>
    <td>{name}</td>
    <td>{location}</td>
    <td>{office}</td>
    <td>Edit &nbsp; Delete</td>
  </tr>
);

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
  }).isRequired,
};

export default Room;
