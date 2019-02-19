import React, { Component } from 'react';
import propTypes from 'prop-types';
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';

// Import the tip
import Tip from '../../commons/Tooltip';
import AverageMeetingDurationsPieChart from './AverageMeetingDurationPieChart';

/**
 * Meeting Duration Pie chart component
 *
 * @returns {JSX}
 */
class MeetingDurationPieChart extends Component {
  // eslint-disable-next-line
  state = {};
  render() {
    const tip =
      'The percentage representation of the average amount of time people spend in all booked meeting rooms in a set time period';
    return (
      <article className="pie-chart">
        <section className="chart-header">
          <p className="chart-title">Average Meetings Duration [%]</p>
          {Tip(tip)}
        </section>
        <section className="chart-content">
          <AverageMeetingDurationsPieChart dateValue={this.props.dateValue} />
          <section className="chart-details">
            <p className="duration-first-circle">
              <span>{}</span>
              Above 60 Minutes
            </p>
            <p className="duration-second-circle">
              <span>{}</span>
              45 - 60 Minutes
            </p>
            <p className="duration-third-circle">
              <span>{}</span>
              30 - 45 Minutes
            </p>
            <p className="duration-forth-circle">
              <span>{}</span>
              Below 30 Minutes
            </p>
          </section>
        </section>
      </article>
    );
  }
}
MeetingDurationPieChart.propTypes = {
  dateValue: propTypes.instanceOf(Object),
};
MeetingDurationPieChart.defaultProps = {
  dateValue: {},
};
export default MeetingDurationPieChart;
