import React from 'react';
import PropType from 'prop-types';
import { notFoundIcon, warningIcon } from '../../utils/images/images';


const ErrorIcon = ({ message }) => (
  <div className="error-class">
    <div>
      <div className="icon-container">
        <img className="error-icon " alt="error_icon" src={message ? notFoundIcon : warningIcon} />
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
  message: PropType.oneOfType([PropType.bool, PropType.string]),
};

ErrorIcon.defaultProps = {
  message: '',
};

export default ErrorIcon;
