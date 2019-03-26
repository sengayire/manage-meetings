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
const AveragePieChartList = ({ dateValue, queryCompleted, updateParent }) => (
  <div className="pie-chart-container">
    <AverageMeetingDurationPieCharts
      dateValue={dateValue}
      queryCompleted={queryCompleted}
      updateParent={updateParent}
    />
    <GetAverageRoomCapacity
      updateParent={updateParent}
    />
    <BookingsCountBarGraph
      dateValue={dateValue}
      updateParent={updateParent}
    />
  </div>
);

AveragePieChartList.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    validatedStartDate: PropTypes.string.isRequired,
    validatedEndDate: PropTypes.string.isRequired,
  }),
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

AveragePieChartList.defaultProps = {
  dateValue: {},
  updateParent: null,
};

export default AveragePieChartList;
