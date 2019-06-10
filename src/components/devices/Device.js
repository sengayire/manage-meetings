import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { IconButtons } from '../commons';
import { editIcon, deleteIcon } from '../../utils/images/images';

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
  handleAction,
  device,
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
    <span className="device-table-action-buttons">
      <IconButtons
        btnImage={<img src={editIcon} alt="edit-icon" />}
        className="edit-device-button"
        openModal={() => handleAction('edit', device)}
      />
      <IconButtons
        btnImage={<img src={deleteIcon} alt="delete-icon" />}
        className="delete-device-button"
        openModal={() => handleAction('delete', device)}
      />
    </span>
  </div>
);

Device.propTypes = {
  handleAction: PropTypes.func.isRequired,
  device: PropTypes.shape({
    name: PropTypes.string.isRequired,
    deviceType: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    lastSeen: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default Device;
