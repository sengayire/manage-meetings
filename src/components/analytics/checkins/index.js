import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/checkins.scss';
import DonutChart from './DonutChart';
import { getCheckinsBookingsCancellationsPercentages } from '../../helpers/QueriesHelpers';
import {
  checkinsChart,
  bookingsChart,
  cancellationsChart,
} from '../../../fixtures/donutChartColors';

// eslint-disable-next-line react/prefer-stateless-function
/**
 * Checkins component
 *
 * @returns {JSX}
 */
export class Checkins extends Component {
  state = {
    loading: false,
    analyticsRatios: {},
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, loading, analyticsRatios } = this.state;
    if (!error && !loading) {
      this.props.queryCompleted('Checkins');
    }
    if (prevState && analyticsRatios !== prevState.analyticsRatios) {
      const { updateParent } = this.props;
      updateParent('checkinsAndCancellations', analyticsRatios);
    }
  }

  /**
   * Returns analytics data when there are no errors or
   * component is done loading
   *
   * @param {analyticsData, loading, error} props
   *
   * @returns {void}
   */
  formatAnalyticsData = (analyticsData, loading, error) => {
    if (!loading && !error) {
      return { ...analyticsData };
    }
    return {};
  };

  /**
   *
   * fetch data
   *
   * @returns {void}
   */
  fetchData = async () => {
    const { dateValue } = this.props;
    this.setState({ loading: true });
    try {
      const data = await getCheckinsBookingsCancellationsPercentages(dateValue);
      this.setState({
        loading: false,
        analyticsRatios: data.analyticsRatios,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
  }

  roundNumber = num => Math.round(num * 100) / 100;

  render() {
    const { isFutureDateSelected } = this.props.dateValue;
    const { loading, error, analyticsRatios } = this.state;
    const {
      checkins,
      checkinsPercentage,
      bookings,
      cancellationsPercentage,
      cancellations,
    } = this.formatAnalyticsData(analyticsRatios, loading, error);
    return (
      <div className="checkins">
        <DonutChart
          chartTitle="% of Checkins"
          entries={checkins}
          total={bookings}
          percentage={this.roundNumber(checkinsPercentage)}
          loading={loading}
          error={error}
          chartColor={checkinsChart}
          dataName="Checkins"
          tip="The number and % of check-ins of booked meeting rooms"
          isFutureDateSelected={isFutureDateSelected}
        />
        <DonutChart
          chartTitle="% of App Bookings"
          entries={15}
          total={20}
          percentage={75}
          loading={loading}
          error={error}
          chartColor={bookingsChart}
          dataName="Bookings"
          tip="The number and % of people who book directly from the app instead from google calendar"
          isFutureDateSelected={isFutureDateSelected}
        />
        <DonutChart
          chartTitle="% of Auto Cancellations"
          entries={cancellations}
          total={bookings}
          percentage={this.roundNumber(cancellationsPercentage)}
          loading={loading}
          error={error}
          chartColor={cancellationsChart}
          dataName="Cancellations"
          hasInfo={false}
          tip="Number and % of auto-cancelled meeting rooms"
          isFutureDateSelected={isFutureDateSelected}
        />
      </div>
    );
  }
}

Checkins.propTypes = {
  dateValue: PropTypes.shape({
    isFutureDateSelected: PropTypes.bool.isRequired,
  }).isRequired,
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

Checkins.defaultProps = {
  updateParent: null,
};


export default Checkins;
