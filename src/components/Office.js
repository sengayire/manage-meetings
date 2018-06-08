import React from 'react';
import PropTypes from 'prop-types';


const Office = ({ office: { name, location, timezone } }) => (
  <tr>
    <td>{name}</td>
    <td>{location}</td>
    <td>{timezone}</td>
    <td>Edit &emsp; Delete</td>
  </tr>
);

Office.propTypes = {
  office: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
};

export default Office;
