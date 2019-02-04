import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/errorBoundary.scss';
import { clearCookies } from '../../utils/Cookie';
import Constants from '../../utils/Constants';
import { removeItemFromLocalStorage } from '../../utils/Utilities';

/**
 * Error catching component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */

const {
  MRM_TOKEN,
} = Constants;

class ErrorBoundary extends React.Component {
  state = { errorInfo: '' };

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      if (this.props.isAuthError) {
        removeItemFromLocalStorage(MRM_TOKEN);
        clearCookies();
      }
      return (
        <div>
          {!this.props.isAuthError && this.props.error}
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthError: PropTypes.bool,
  error: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  isAuthError: false,
  error: 'Something went wrong',
};

export default ErrorBoundary;
