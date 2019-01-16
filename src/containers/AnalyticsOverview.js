import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Checkins from '../../src/components/analytics/checkins';
import { getTodaysDate } from '../utils/Utilities';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AverageMeetingListComponent from '../components/analytics/AverageMeetingList';
import ComposedBookedRooms from '../components/analytics/ComposedBookedRooms';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';

const AnalyticsOverview = ({ dateValue }) => (
  <Fragment>
    <AveragePieChartList dateValue={dateValue} />
    <ComposedBookedRooms dateValue={dateValue} />
    <Checkins />
    <AverageMeetingListComponent dateValue={dateValue} />
  </Fragment>
);

AnalyticsOverview.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
};

AnalyticsOverview.defaultProps = {
  dateValue: {
    startDate: `"${getTodaysDate()}"`,
    endDate: `"${getTodaysDate()}"`,
  },
};

export default AnalyticsOverview;
