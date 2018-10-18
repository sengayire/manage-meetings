import React, { Fragment } from 'react';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';
import Checkins from '../../src/components/analytics/checkins';
import ComposedBookedRooms from '../components/analytics/ComposedBookedRooms';

const AnalyticsOverview = () => (
  <Fragment>
    <AveragePieChartList />
    <ComposedBookedRooms />
    <Checkins />
  </Fragment>
);


export default AnalyticsOverview;
