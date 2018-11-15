import React from 'react';
import MeetingDurationPieChart from './MeetingDurationPieChart';
import RoomCapacityPieChart from './RoomCapacityPieChart';

// import styles
import '../../../../src/assets/styles/averagePieChartList.scss';
import AttendeesPieChart from './AttendeesPieChart';
import BookingsCountBarGraph from '../barGraph/BookingsCountBarGraph';

const AveragePieChartList = () => (
  <div className="pie-chart-container">
    <MeetingDurationPieChart />
    <RoomCapacityPieChart />
    <BookingsCountBarGraph />
  </div>
);

export default AveragePieChartList;
