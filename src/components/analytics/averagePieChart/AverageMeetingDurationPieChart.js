import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { meetingDurationBackground, borderColor } from '../../../fixtures/pieChartColors';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';
import ErrorIcon from '../../commons/ErrorIcon';
import Overlay from '../../commons/Overlay';
import { getAnalyticForMeetingDurations } from '../../helpers/QueriesHelpers';

/**
 * AverageMeetingDurationPieChart Component
 *
 * @extends React.Component
 *
 * @returns {JSX} - a pie chart for average meeting duration
 */
export class AverageMeetingDurationPieChart extends React.Component {
  state = {
    analyticsForMeetingsDurations: {},
    loading: true,
  };

  async componentDidMount() {
    const { updateParent } = this.props;
    await this.getAnalyticForMeetingDurations();
    const { MeetingsDurationaAnalytics } = this.state.analyticsForMeetingsDurations;
    updateParent('averageMeetingDuration', this.getSectorWidths(MeetingsDurationaAnalytics));
  }

  componentDidUpdate(prevProps) {
    const { updateParent, dateValue: { startDate, endDate } } = this.props;
    const { analyticsForMeetingsDurations: { MeetingsDurationaAnalytics } } = this.state;
    const { startDate: prevStartDate, endDate: prevEndDate } = prevProps.dateValue;
    if (prevStartDate !== startDate || prevEndDate !== endDate) {
      this.getAnalyticForMeetingDurations();
      updateParent('averageMeetingDuration', this.getSectorWidths(MeetingsDurationaAnalytics));
    }
  }

  async getAnalyticForMeetingDurations() {
    const { dateValue } = this.props;
    if (!this.state.loading) this.setState({ loading: true });
    const { analyticsForMeetingsDurations } = await getAnalyticForMeetingDurations({ dateValue });
    this.props.queryCompleted('AverageMeetingDuration');
    this.setState({ loading: false, analyticsForMeetingsDurations });
  }

  /**
   * Calculates the percentage of a particular meeting duration range.
   *
   * @param {number} range - meeting duration range e.g. between30And45
   * @param {number} numberOfMeetingDurations - number of total meeting duration
   * for the date range selected
   * @returns {number} - percentage of the meeting duration range
   */
  getPercentageDuration = (range, numberOfMeetingDurations) =>
    Math.round((range * 100) / numberOfMeetingDurations);

  /**
   * Calculates the width of each sectors in the pie chart
   *
   * @param {Array} MeetingsDurationAnalytics - An array of all the meting durations
   * for the date range selected
   * @returns {Array} - Array of various sector widths to be used by the pie chart
   */
  getSectorWidths = (MeetingsDurationAnalytics) => {
    const durations = Array.from(
      MeetingsDurationAnalytics,
      (duration) => {
        if (duration.count === 0) {
          return 0;
        }
        return duration.totalDuration / duration.count;
      },
    );
    let greaterThan60 = 0;
    let between45And60 = 0;
    let between30And45 = 0;
    let between1And29 = 0;
    let zero = 0;
    durations.forEach((duration) => {
      if (duration > 60) greaterThan60 += 1;
      if (duration > 45 && duration <= 60) between45And60 += 1;
      if (duration > 29 && duration <= 45) between30And45 += 1;
      if (duration > 0 && duration <= 29) between1And29 += 1;
      if (duration === 0) zero += 1;
    });
    greaterThan60 = this.getPercentageDuration(greaterThan60, durations.length);
    between45And60 = this.getPercentageDuration(between45And60, durations.length);
    between30And45 = this.getPercentageDuration(between30And45, durations.length);
    between1And29 = this.getPercentageDuration(between1And29, durations.length);
    zero = this.getPercentageDuration(zero, durations.length);
    return [greaterThan60, between45And60, between30And45, between1And29, zero];
  };

  renderPieChart = () => {
    const {
      analyticsForMeetingsDurations: {
        MeetingsDurationaAnalytics = [],
      } = {}, loading,
    } = this.state;

    if (!MeetingsDurationaAnalytics.length && !loading) {
      return <ErrorIcon message="No resource found" />;
    }

    const dummySectorWidths = ['100', '0', '0', '0', '0'];

    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };
    const graphData = {
      labels: [
        'Above 60 Minutes in %',
        '45-60 Minutes in %',
        '30-45 Minutes in %',
        '1 - 29 Minutes in %',
        '0 in %',
      ],
      datasets: [
        {
          label: 'Average Meeting Duration',
          data: loading ? dummySectorWidths : this.getSectorWidths(MeetingsDurationaAnalytics),
          backgroundColor: meetingDurationBackground,
          borderColor,
          borderWidth: 4,
        },
      ],
    };

    return (
      <section className="chart-content">
        {loading && <Overlay />}
        <div>
          <Pie data={graphData} options={options} width={172} />
        </div>
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
            1 - 29 Minutes
          </p>
          <p className="duration-fifth-circle">
            <span>{}</span>
            Zero
          </p>
        </section>
      </section>
    );
  };

  render() {
    const { isFutureDateSelected } = this.props.dateValue;
    const tip =
      'The percentage representation of the average amount of time people spend in all booked meeting rooms in a set time period';
    return (
      <article className="pie-chart overlay-container">
        <section className="chart-header">
          <p className="chart-title">Average Meetings Duration [%]</p>
          {Tip(tip)}
        </section>
        {isFutureDateSelected ? (
          <ErrorIcon message="You cannot fetch data beyond today" />
        ) : (
          this.renderPieChart()
        )}
      </article>
    );
  }
}

AverageMeetingDurationPieChart.propTypes = {
  dateValue: PropTypes.instanceOf(Object),
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

AverageMeetingDurationPieChart.defaultProps = {
  dateValue: {},
  updateParent: null,
};

export default AverageMeetingDurationPieChart;
