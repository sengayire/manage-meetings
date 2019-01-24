import React from 'react';
import PropTypes from 'prop-types';
import MeetingDurationPieChart from './MeetingDurationPieChart';
import RoomCapacityPieChart from './RoomCapacityPieChart';

// import styles
import '../../../../src/assets/styles/averagePieChartList.scss';
import BookingsCountBarGraph from '../barGraph/BookingsCountBarGraph';

/**
 * Average Pie Chart list component
 *
 * @param {Object} dateValueObject
 *
 * @returns {JSX}
 */
const AveragePieChartList = ({ dateValue }) => (
  <div className="pie-chart-container">
    <MeetingDurationPieChart dateValue={dateValue} />
    <RoomCapacityPieChart />
    <BookingsCountBarGraph dateValue={dateValue} />
  </div>
);

AveragePieChartList.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
};

AveragePieChartList.defaultProps = {
  dateValue: {},
};

export default AveragePieChartList;
