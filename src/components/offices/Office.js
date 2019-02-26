import React from 'react';
import PropTypes from 'prop-types';
import DeleteOffice from './DeleteOffice'; //eslint-disable-line
import EditOffice from './EditOffice'; //eslint-disable-line

/**
 * shows offices data in a table
 *
 * @param {Object} office
 *
 * @returns {JSX}
 */
const Office = ({ office: { id, location, name }, refetch, currentPage }) => {
  let gmt = '';
  if (location.timeZone.includes('WEST')) {
    gmt = 'GMT +1';
  } else {
    gmt = 'GMT +3';
  }
  return (
    <div className="table__row">
      <span>{name}</span>
      <span>{location.name}</span>
      <span>{gmt}</span>
      <span>
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
      </span>
    </div>
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
