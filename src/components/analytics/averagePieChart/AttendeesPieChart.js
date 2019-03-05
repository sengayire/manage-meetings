import React, { Component } from 'react';

// import svg files
import { attendeesChart } from '../../../../src/utils/images/images';

// import styles
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/attendeesPieChart.scss';

// Import the tip
import Tip from '../../commons/Tooltip';

/**
 * Attendees Pie chart component
 *
 * @returns {JSX}
 */
class AttendeesPieChart extends Component {
  // eslint-disable-next-line
  state = {};

  render() {
    const tip = 'Number of attendees in a booked meeting room per meeting room';
    return (
      <article className="pie-chart">
        <section className="chart-header">
          <p className="chart-title">Average No. of Attendees/ Meeting</p>
          {Tip(tip)}
        </section>
        <section className="chart-content">
          <img src={attendeesChart} alt="average meeting chart" />
          <section className="chart-details">
            <p className="attendees-first-circle">
              <span>{}</span>
              130 (Yes)
            </p>
            <p className="attendees-second-circle">
              <span>{}</span>
              20 (Maybe)
            </p>
            <p className="attendees-third-circle">
              <span>{}</span>6 (No)
            </p>
          </section>
        </section>
      </article>
    );
  }
}

export default AttendeesPieChart;
