import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ message }) => (
  <div className="error-occurred">{message}</div>
);

Errors.propTypes = {
  message: PropTypes.string,
};

Errors.defaultProps = {
  message: '',
};
export default Errors;
