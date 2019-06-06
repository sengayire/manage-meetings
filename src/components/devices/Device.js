import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const formatDate = date => moment(date).format('DD MMM YYYY');

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
    name, deviceType, dateAdded, lastSeen, location, /* room: { name: roomName }, */
  },
}) => (
  <div className="table__row">
    <span>{name}</span>
    <span>{deviceType}</span>
    <span>{formatDate(dateAdded)}</span>
    <span>{formatDate(lastSeen)}</span>
    <span>{location}</span>
    {/* <span>{roomName}</span> */}
  </div>
);

Device.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string.isRequired,
    deviceType: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    lastSeen: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default Device;
