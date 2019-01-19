import React from 'react';
import '../../assets/styles/spinner.scss';

/**
 * Reusable Spinner Component
 *
 * @returns {JSX}
 */
const Spinner = prop => (
  <div className="centered">
    <div className={prop.size === 'small' ? 'spinner small' : 'spinner'} />
  </div>
);

Spinner.defaultProps = {
  size: '',
};

export default Spinner;
