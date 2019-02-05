import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @returns {JSX}
 */
const Center = (props) => {
  const { name, country, abbreviation } = props.location;

  return (
    <tr>
      <td>{name}</td>
      <td>{country.split('.')[1]}</td>
      <td>{abbreviation}</td>
    </tr>
  );
};

Center.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};

export default Center;
