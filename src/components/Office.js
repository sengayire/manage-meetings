import React from 'react';
import PropTypes from 'prop-types';
import DeleteOffice from './DeleteOffice';
import EditOffice from './EditOffice';


const Office = ({ office: { name, location, timezone } }) => (
  <tr>
    <td>{name}</td>
    <td>{location}</td>
    <td>{timezone}</td>
    <td>
      <EditOffice />
      <DeleteOffice officeName={name} id="delete-modal" />
    </td>
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
