import React, { Fragment } from 'react';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/analyticsContainer.scss';
// eslint-disable-next-line
import AnalyticsNav from '../components/navbars/AnalyticsNav';

const Analytics = () => (
  <Fragment>
    <NavBar />
    <div className="analytics-container">
      <AnalyticsNav />
    </div>
  </Fragment>
);

export default Analytics;
