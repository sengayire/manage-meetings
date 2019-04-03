import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/analyticsContainer.scss';
// eslint-disable-next-line
import AnalyticsNav from '../components/navbars/AnalyticsNav';

const Analytics = ({ client }) => (
  <Fragment>
    <NavBar />
    <div className="analytics-container">
      <AnalyticsNav client={client} />
    </div>
  </Fragment>
);

Analytics.propTypes = {
  client: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default Analytics;
