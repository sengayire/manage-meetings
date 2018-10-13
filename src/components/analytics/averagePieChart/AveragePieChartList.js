import React from 'react';
import MeetingDurationPieChart from './MeetingDurationPieChart';
import RoomCapacityPieChart from './RoomCapacityPieChart';

// import styles
import '../../../../src/assets/styles/averagePieChartList.scss';
import AttendeesPieChart from './AttendeesPieChart';

const AveragePieChartList = () => (
  <div className="pie-chart-container">
    <MeetingDurationPieChart />
    <RoomCapacityPieChart />
    <AttendeesPieChart />
  </div>
);

export default AveragePieChartList;
