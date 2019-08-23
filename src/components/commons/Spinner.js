import React from 'react';
import '../../assets/styles/spinner.scss';

/**
 * Reusable Spinner Component
 *
 * @returns {JSX}
 */
const Spinner = prop => (
  <div className="centered">
    <div className={prop.size ? `spinner ${prop.size}` : 'spinner'} />
  </div>
);

Spinner.defaultProps = {
  size: '',
};

export default Spinner;
