import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/errorBoundary.scss';


/**
 * Error catching component
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */


class ErrorBoundary extends React.Component {
  state = { errorInfo: '', error: '' };

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
      error,
    });
  }


  render() {
    if (this.state.errorInfo || this.state.error) {
      return (
        <div>
          {(!this.props.isAuthError || this.state.error) && (this.props.error || this.state.error) }
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
