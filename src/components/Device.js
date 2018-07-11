import React from 'react';
import PropTypes from 'prop-types';

const Device = ({
  device: {
    name, type, date, last, location,
  },
}) => (
  <tr>
    <td>{name}</td>
    <td>{type}</td>
    <td>{date}</td>
    <td>{last}</td>
    <td>{location}</td>
  </tr>
);

Device.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default Device;
