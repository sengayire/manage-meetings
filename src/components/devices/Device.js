import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * Device component
 *
 * @param {Object} device
 *
 * @returns {JSX}
 */
const Device = ({
  device: {
    name, type, date, last, location,
  },
}) => (
  <div className="table__row">
    <span>{name}</span>
    <span>{type}</span>
    <span>{date}</span>
    <span>{last}</span>
    <span>{location}</span>
  </div>
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
