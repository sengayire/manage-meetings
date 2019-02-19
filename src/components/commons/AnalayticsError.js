import React from 'react';
import PropTypes from 'prop-types';
import Warning from '../../assets/images/warning_icon.svg';

const AnalyticsError = ({ title }) => (
  <article className="pie-chart">
    <section className="chart-header">
      <p className="chart-title">{title}</p>
    </section>
    <section className="chart-content">
      <div className="error-class">
        <div className="icon-container">
          <img className="error-icon" src={Warning} alt="error_icon" />
        </div>
        <b><p className="error-msg">An error occurred, cannot fetch data</p></b>
      </div>
    </section>
  </article>
);

AnalyticsError.propTypes = {
  title: PropTypes.string,
};

AnalyticsError.defaultProps = {
  title: '',
};
export default AnalyticsError;
