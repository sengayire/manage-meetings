import React, { Fragment } from 'react';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';
import Checkins from '../../src/components/analytics/checkins';

const AnalyticsOverview = () => (
  <Fragment>
    <AveragePieChartList />
    <Checkins />
  </Fragment>
);


export default AnalyticsOverview;
