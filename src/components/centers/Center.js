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
    <tr>
      <td>{name}</td>
      <td>{country.split('.')[1]}</td>
      <td>{abbreviation}</td>
      <td>
        <EditCenter
          id="edit-modal"
          centerName={name}
          country={country}
          abbreviation={abbreviation}
          centerId={id}
          refetch={refetch}
        />
      &nbsp;
        <DeleteCenter
          centerName={name}
          centerId={id}
          refetch={refetch}
          id="delete-modal"
        />
      </td>
    </tr>
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
