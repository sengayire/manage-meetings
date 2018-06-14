import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-toolbox/lib/button';

const Amenity = ({ amenity: { name, rooms }, doDelete }) => (
  <tr>
    <td>{name}</td>
    <td>{rooms}</td>
    <td className="action-buttons">
      <Button label="Edit" flat />
      <Button label="Delete" onClick={doDelete} flat />
    </td>
  </tr>
);

Amenity.propTypes = {
  amenity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rooms: PropTypes.number.isRequired,
  }).isRequired,
  doDelete: PropTypes.func.isRequired,
};

export default Amenity;
