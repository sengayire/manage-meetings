import React from 'react';
import PropTypes from 'prop-types';

const Amenity = ({ amenity: { name, rooms } }) => (
  <tr>
    <td>{name}</td>
    <td>{rooms}</td>
    <td>Edit &emsp; Delete</td>
  </tr>
);

Amenity.propTypes = {
  amenity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rooms: PropTypes.number.isRequired,
  }).isRequired,
};

export default Amenity;
