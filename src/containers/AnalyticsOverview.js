import React, { Fragment } from 'react';
import CheckinsAnalytics from '../../src/components/analytics/checkins';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AverageMeetingListComponent from '../components/analytics/AverageMeetingList';
import ComposedBookedRooms from '../components/analytics/ComposedBookedRooms';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';

const AnalyticsOverview = () => (
  <Fragment>
    <AveragePieChartList />
    <ComposedBookedRooms />
    <CheckinsAnalytics />
    <AverageMeetingListComponent />
  </Fragment>
);

export default AnalyticsOverview;
