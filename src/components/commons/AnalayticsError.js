import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../commons/ErrorIcon';

const AnalyticsError = ({ message }) => (
  <article className="pie-chart">
    <ErrorIcon message={message} />
  </article>
);

AnalyticsError.propTypes = {
  message: PropTypes.string,
};

AnalyticsError.defaultProps = {
  message: '',
};
export default AnalyticsError;
