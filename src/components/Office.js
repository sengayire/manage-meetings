import React from 'react';
import PropTypes from 'prop-types';
import DeleteOffice from './DeleteOffice'; //eslint-disable-line
import EditOffice from './EditOffice'; //eslint-disable-line

const Office = ({ office: { id, location, name }, refetch, currentPage }) => {
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
        <EditOffice
          id="edit-modal"
          officeName={name}
          officeId={id}
          officeLocation={location.name}
          refetch={refetch}
          currentPage={currentPage}
        />
        &nbsp;
        <DeleteOffice
          officeName={name}
          id="delete-modal"
          officeId={id}
          refetch={refetch}
          currentPage={currentPage}
        />
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
  refetch: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
};

Office.defaultProps = {
  currentPage: 1,
};

export default Office;
