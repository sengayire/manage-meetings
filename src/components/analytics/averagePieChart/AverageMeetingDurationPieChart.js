import React from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import MEETING_DURATION_ANALYTICS from '../../../graphql/queries/analytics';
import { meetingDurationBackground, borderColor } from '../../../fixtures/pieChartColors';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';
import ErrorIcon from '../../commons/ErrorIcon';
import Overlay from '../../commons/Overlay';

/**
 * AverageMeetingDurationPieChart Component
 *
 * @extends React.Component
 *
 * @returns {JSX} - a pie chart for average meeting duration
 */
export class AverageMeetingDurationPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analyticsForMeetingsDurations: { ...props.data.analyticsForMeetingsDurations },
    };
    this.reFetchQuery();
  }

  componentDidUpdate(prevProps, { MeetingsDurationaAnalytics }) {
    const { updateParent } = this.props;
    if (!this.props.data.error && !this.props.data.loading) {
      this.props.queryCompleted('AverageMeetingDuration');
    }
    if (
      MeetingsDurationaAnalytics !==
      this.state.analyticsForMeetingsDurationsMeetingsDurationaAnalytics
    ) {
      updateParent('averageMeetingDuration', this.getSectorWidths());
    }
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
      duration => duration.totalDuration / duration.count,
    );
    let greaterThan60 = 0;
    let between45And60 = 0;
    let between30And45 = 0;
    let thirtyAndBelow = 0;
    durations.forEach((duration) => {
      if (duration > 60) greaterThan60 += 1;
      if (duration > 45 && duration <= 60) between45And60 += 1;
      if (duration > 30 && duration <= 45) between30And45 += 1;
      if (duration < 30) thirtyAndBelow += 1;
    });
    greaterThan60 = this.getPercentageDuration(greaterThan60, durations.length);
    between45And60 = this.getPercentageDuration(between45And60, durations.length);
    between30And45 = this.getPercentageDuration(between30And45, durations.length);
    thirtyAndBelow = this.getPercentageDuration(thirtyAndBelow, durations.length);
    return [greaterThan60, between45And60, between30And45, thirtyAndBelow];
  };

  /**
   * Re-fetches the query when the variables are available in the props
   *
   * @returns {void}
   */
  reFetchQuery = () => {
    /* istanbul ignore next */
    /* Reasoning: no explicit way of testing configuration options */
    this.props.data
      .fetchMore({
        variables: {
          startDate: this.props.dateValue.validatedStartDate,
          endDate: this.props.dateValue.validatedEndDate,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          this.setState({
            analyticsForMeetingsDurations: fetchMoreResult.analyticsForMeetingsDurations,
          });
        },
      })
      .then(() => null)
      .catch(() => null);
  };

  renderPieChart = () => {
    const { MeetingsDurationaAnalytics = [] } = this.state.analyticsForMeetingsDurations;
    const { loading, error } = this.props.data;

    if (error) {
      return <ErrorIcon message={error.graphQLErrors.length > 0 && 'No resource found'} />;
    }

    const dummySectorWidths = ['100', '0', '0', '0'];

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
        'Below 30 minutes in %',
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
            Below 30 Minutes
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
  data: PropTypes.shape({
    analyticsForMeetingsDurations: PropTypes.object,
    fetchMore: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.any,
  }).isRequired,
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

AverageMeetingDurationPieChart.defaultProps = {
  dateValue: {},
  updateParent: null,
};

export default compose(
  graphql(MEETING_DURATION_ANALYTICS, {
    name: 'data',
    options: props => ({
      variables: {
        startDate: props.dateValue.validatedStartDate,
        endDate: props.dateValue.validatedEndDate,
      },
    }),
  }),
)(AverageMeetingDurationPieChart);
