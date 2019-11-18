import React from 'react';

import '../../assets/styles/insightsPage.scss';
import MostBookedRooms from './insightsComponents/mostBookedRooms';
import LeastBookedRooms from './insightsComponents/leastBookedRooms';
import UsedRooms from './insightsComponents/roomUsage';
import InsightsBarChart from './insightsComponents/insightsBarChart';

const InsightsPage = () => (
  <div className="insights_container">
    <div className="insights-container-header">
      <div className="message">
        <h1 className="insights"> Insights </h1>
        <p className="insights-configure-andela-cen">Meeting room usage at Andela</p>
      </div>
    </div>
    <div className="insights-main">
      <div className="insights_left">
        <UsedRooms />
        <MostBookedRooms />
        <LeastBookedRooms />
      </div>
      <div className="insights_right">
        <InsightsBarChart />
      </div>
    </div>
  </div>
);

export default InsightsPage;
