import React from 'react';
import PropTypes from 'prop-types';
import DeleteOffice from './DeleteOffice'; //eslint-disable-line
import { EditOffice } from './EditOffice';

const Office = ({ office: { id, location, name } }) => {
  let gmt = '';
  if (location.timeZone.includes('WEST')) {
    gmt = 'GMT +1';
  } else {
    gmt = 'GMT -1';
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{location.name}</td>
      <td>{gmt}</td>
      <td>
        <EditOffice officeName={name} location={location.name} />&nbsp;
        <DeleteOffice officeName={name} id="delete-modal" officeId={id} />
      </td>
    </tr>
  );
};

Office.propTypes = {
  office: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string,
      timeZone: PropTypes.string,
    }),
  }).isRequired,
};

export default Office;
