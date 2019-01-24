import React from 'react';
import '../../assets/styles/spinner.scss';

/**
 * Reusable Spinner Component
 *
 * @returns {JSX}
 */
const Spinner = () => (
  <div className="centered">
    <div className="spinner" />
  </div>
);

const SmallSpinner = () => (
  <div className="centered">
    <div className="spinner small" />
  </div>
);

export { Spinner as default, SmallSpinner };
