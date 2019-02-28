import React from 'react';
import PropType from 'prop-types';
import Warning from '../../assets/images/warning_icon.svg';

const ErrorIcon = ({ message }) => (
  <div className="error-class">
    <div>
      <div className="icon-container">
        <img className="error-icon" src={Warning} alt="error_icon" />
      </div>
      <b>
        <p className="error-msg">
          {message || 'An error occurred, cannot fetch data'}
        </p>
      </b>
    </div>
  </div>
);

ErrorIcon.propTypes = {
  message: PropType.string,
};

ErrorIcon.defaultProps = {
  message: '',
};

export default ErrorIcon;
