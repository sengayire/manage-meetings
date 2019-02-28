import React from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import MEETING_DURATION_ANALYTICS from '../../../graphql/queries/analytics';
import { meetingDurationBackground, borderColor } from '../../../fixtures/pieChartColors';
import Spinner from '../../commons/Spinner';
import Tip from '../../commons/Tooltip';
import '../../../../src/assets/styles/pieChartBaseStyle.scss';
import '../../../../src/assets/styles/meetingDurationPieChart.scss';
import ErrorIcon from '../../commons/ErrorIcon';

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
  /**
   * Re-fetches the query when the variables are available in the props
   *
   * @returns {void}
   */
  reFetchQuery = () => {
    /* istanbul ignore next */
    /* Reasoning: no explicit way of testing configuration options */
    this.props.data.fetchMore({
      variables: {
        startDate: this.props.dateValue.validatedStartDate,
        endDate: this.props.dateValue.validatedEndDate,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          analyticsForMeetingsDurations: fetchMoreResult.analyticsForMeetingsDurations,
        });
      },
    }).then(() => null)
      .catch(() => null);
  };

  renderPieChart = () => {
    const { MeetingsDurationaAnalytics = [] } = this.state.analyticsForMeetingsDurations;
    const { loading, error } = this.props.data;
    const { queryCompleted } = this.props;

    if (loading) return <Spinner />;
    if (error) return (<ErrorIcon />);

    queryCompleted('AverageMeetingDuration');
    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };
    const durations = Array.from(MeetingsDurationaAnalytics, duration =>
      duration.totalDuration / duration.count);
    let greaterThan60 = 0;
    let between45And60 = 0;
    let between30And45 = 0;
    let thirtyAndBelow = 0;
    for (let index = 0; index < durations.length; index += 1) {
      if (durations[index] > 60) {
        greaterThan60 += 1;
      } else if ((durations[index] > 45) && (durations[index] <= 60)) {
        between45And60 += 1;
      } else if ((durations[index] > 30) && (durations[index] <= 45)) {
        between30And45 += 1;
      } else {
        thirtyAndBelow += 1;
      }
    }
    greaterThan60 = Math.round((greaterThan60 * 100) / durations.length);
    between45And60 = Math.round((between45And60 * 100) / durations.length);
    between30And45 = Math.round((between30And45 * 100) / durations.length);
    thirtyAndBelow = Math.round((thirtyAndBelow * 100) / durations.length);
    const graphData = {
      labels: ['Above 60 Minutes', '45-60 Minutes', '30-45 Minutes', 'Below 30 minutes'],
      datasets: [{
        label: 'Average Meeting Duration',
        data: [greaterThan60, between45And60, between30And45, thirtyAndBelow],
        backgroundColor: meetingDurationBackground,
        borderColor,
        borderWidth: 4,
      }],
    };

    return (
      <section className="chart-content">
        <div>
          <Pie
            data={graphData}
            options={options}
            width={172}
          />
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
  }

  render() {
    const { isFutureDateSelected } = this.props.dateValue;
    const tip =
      'The percentage representation of the average amount of time people spend in all booked meeting rooms in a set time period';
    return (
      <article className="pie-chart">
        <section className="chart-header">
          <p className="chart-title">Average Meetings Duration [%]</p>
          {Tip(tip)}
        </section>
        {
          isFutureDateSelected ? <ErrorIcon message="You cannot fetch data beyond today" /> : this.renderPieChart()
        }
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
};
AverageMeetingDurationPieChart.defaultProps = {
  dateValue: {},
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
