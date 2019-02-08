import React from 'react';
import Warning from '../../assets/images/warning_icon.svg';

const ErrorIcon = () => (
  <div className="error-class">
    <div>
      <div className="icon-container">
        <img className="error-icon" src={Warning} alt="error_icon" />
      </div>
      <b><p className="error-msg">An error occurred, cannot fetch data</p></b>
    </div>
  </div>
);

export default ErrorIcon;
