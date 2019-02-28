import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Checkins from '../../src/components/analytics/checkins'; // eslint-disable-line
import { getTodaysDate } from '../utils/Utilities';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import AverageMeetingListComponent from '../components/analytics/AverageMeetingList';
import ComposedBookedRooms from '../components/analytics/ComposedBookedRooms';
import AveragePieChartList from '../components/analytics/averagePieChart/AveragePieChartList';

const AnalyticsOverview = ({ dateValue, queryCompleted }) => (
  <Fragment>
    <AveragePieChartList
      dateValue={dateValue}
      queryCompleted={queryCompleted}
    />
    <ComposedBookedRooms dateValue={dateValue} />
    <Checkins
      dateValue={dateValue}
      queryCompleted={queryCompleted}
    />
    <AverageMeetingListComponent
      dateValue={dateValue}
      queryCompleted={queryCompleted}
    />
  </Fragment>
);

AnalyticsOverview.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    validatedEndDate: PropTypes.string,
    validatedStartDate: PropTypes.string,
  }),
  queryCompleted: PropTypes.func.isRequired,
};

AnalyticsOverview.defaultProps = {
  dateValue: {
    startDate: `"${getTodaysDate()}"`,
    endDate: `"${getTodaysDate()}"`,
  },
};

export default AnalyticsOverview;
