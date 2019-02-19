import React from 'react';
import PropTypes from 'prop-types';

// import styles
import '../../../../src/assets/styles/averagePieChartList.scss';
import BookingsCountBarGraph from '../barGraph/BookingsCountBarGraph';
import AverageMeetingDurationPieCharts from './AverageMeetingDurationPieChart';
import GetAverageRoomCapacity from './GetAverageRoomCapacity';

/**
 * Average Pie Chart list component
 *
 * @param {Object} dateValueObject
 *
 * @returns {JSX}
 */
const AveragePieChartList = ({ dateValue }) => (
  <div className="pie-chart-container">
    <AverageMeetingDurationPieCharts dateValue={dateValue} />
    <GetAverageRoomCapacity />
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
