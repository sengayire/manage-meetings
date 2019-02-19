import React, { Component } from 'react';

import GetAverageRoomCapacity from './GetAverageRoomCapacity';
// import styles
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/roomCapacityPieChart.scss';

// Import the tip
import Tip from '../../commons/Tooltip';

/**
 * Room capacity Pie chart component
 *
 * @returns {JSX}
 */
class RoomCapacityPieChart extends Component {
  // eslint-disable-next-line
  state = {};
  render() {
    // const tip = 'The number of people a meeting room can accommodate';
    const tip = 'The percentage representation of the average rooms\' capacity ';
    return (
      <article className="pie-chart">
        <section className="chart-header">
          <p className="chart-title">Average Rooms Capacity [%]</p>
          {Tip(tip)}
        </section>
        <section className="chart-content">
          <GetAverageRoomCapacity />
          <section className="chart-details">
            <p className="room-capacity-first-circle">
              <span>{}</span>
              Less than 10
            </p>
            <p className="room-capacity-second-circle">
              <span>{}</span>
              10 - 20
            </p>
            <p className="room-capacity-third-circle">
              <span>{}</span>
              More than 20
            </p>
          </section>
        </section>
      </article>
    );
  }
}

export default RoomCapacityPieChart;
