import React, { Fragment } from 'react';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/analyticsContainer.scss';
import AnalyticsOverview from './AnalyticsOverview';

const Analytics = () => (
  <Fragment>
    <NavBar />
    <div className="analytics-container">
      <AnalyticsOverview />
    </div>
  </Fragment>
);

export default Analytics;
