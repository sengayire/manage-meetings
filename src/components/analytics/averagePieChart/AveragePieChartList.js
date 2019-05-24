import React from 'react';
import '../../../../src/assets/styles/averagePieChartList.scss';
import BookingsCountBarGraph from '../barGraph/BookingsCountBarGraph';
import AverageMeetingDurationPieCharts from './AverageMeetingDurationPieChart';
import GetAverageRoomCapacity from './GetAverageRoomCapacity';

const AveragePieChartList = () => (
  <div className="pie-chart-container">
    <AverageMeetingDurationPieCharts />
    <GetAverageRoomCapacity />
    <BookingsCountBarGraph />
  </div>
);

export default AveragePieChartList;
