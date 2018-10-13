import React, { Fragment } from 'react';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';

const AnalyticsOverview = () => (
  <Fragment>
    <AveragePieChartList />
  </Fragment>
);


export default AnalyticsOverview;
