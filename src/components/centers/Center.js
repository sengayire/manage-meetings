import React from 'react';
import PropTypes from 'prop-types';
import EditCenter from './EditCenter'; //eslint-disable-line
import DeleteCenter from './DeleteCenter'; //eslint-disable-line

/**
 * @param {object} props
 * @returns {JSX}
 */
const Center = (props) => {
  const {
    name, country, id, abbreviation,
  } = props.location;
  const { refetch } = props;
  return (
    <div className="table__row">
      <span>{name}</span>
      <span>{country.split('.')[1]}</span>
      <span>{abbreviation}</span>
      <span>
        <EditCenter
          id="edit-modal"
          centerName={name}
          country={country}
          abbreviation={abbreviation}
          centerId={id}
          refetch={refetch}
        />
        &nbsp;
        <DeleteCenter centerName={name} centerId={id} refetch={refetch} id="delete-modal" />
      </span>
    </div>
  );
};

Center.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Center;
