import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Checkins from '../../src/components/analytics/checkins';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AverageMeetingList from '../components/analytics/AverageMeetingList';
import ComposedBookedRooms from '../components/analytics/ComposedBookedRooms';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';

const AnalyticsOverview = ({ dateValue }) => (
  <Fragment>
    <AveragePieChartList />
    <ComposedBookedRooms dateValue={dateValue} />
    <Checkins />
    <AverageMeetingList dateValue={dateValue} />
  </Fragment>
);

AnalyticsOverview.defaultProps = {
  dateValue: {},
};

AnalyticsOverview.propTypes = {
  dateValue: PropTypes.shape({
    date: PropTypes.object,
  }),
};

AnalyticsOverview.propTypes = {
  dateValue: PropTypes.string,
};
AnalyticsOverview.defaultProps = {
  dateValue: 'Today',
};

export default AnalyticsOverview;
