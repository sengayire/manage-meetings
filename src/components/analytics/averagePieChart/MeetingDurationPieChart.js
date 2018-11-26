import React, { Component } from 'react';

// import svg files
import averageMeetingChart from '../../../../src/assets/images/average_meeting_chart.svg';

// import styles
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';

// Import the tip
import Tip from '../../commons/Tooltip';

class MeetingDurationPieChart extends Component {
  // eslint-disable-next-line
  state = {};
  render() {
    const tip =
      'The average amount of time people spend in all booked meeting rooms in a set time period';
    return (
      <article className="pie-chart">
        <section className="chart-header">
          <p className="chart-title">Average Meeting Duration</p>
          {Tip(tip)}
        </section>
        <section className="chart-content">
          <img src={averageMeetingChart} alt="average meeting chart" />
          <section className="chart-details">
            <p className="duration-first-circle">
              <span>{}</span>
              60 Minutes
            </p>
            <p className="duration-second-circle">
              <span>{}</span>
              45 Minutes
            </p>
            <p className="duration-third-circle">
              <span>{}</span>
              30 Minutes
            </p>
          </section>
        </section>
      </article>
    );
  }
}

export default MeetingDurationPieChart;
