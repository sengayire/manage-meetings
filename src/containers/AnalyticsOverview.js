import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';
import Checkins from '../../src/components/analytics/checkins';
import ComposedBookedRooms from '../components/analytics/ComposedBookedRooms';
import AverageMeetingList from '../components/analytics/AverageMeetingList';

const AnalyticsOverview = ({ dateValue }) => (
  <Fragment>
    <AveragePieChartList />
    <ComposedBookedRooms />
    <Checkins />
    <AverageMeetingList dateValue={dateValue} />
  </Fragment>
);
AnalyticsOverview.defaultProps = {
  dateValue: 'Today',
};

AnalyticsOverview.propTypes = {
  dateValue: PropTypes.string,
};

export default AnalyticsOverview;
