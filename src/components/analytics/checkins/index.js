import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import '../../../assets/styles/checkins.scss';
import DonutChart from './DonutChart';
import { CHECKINS_BOOKINGS_CANCELLATIONS_PERCENTAGES } from '../../../graphql/queries/analytics';
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
  componentDidUpdate(prevProps) {
    if (!this.props.data.error && !this.props.data.loading) {
      this.props.queryCompleted('Checkins');
    }
    if (prevProps && this.props.data.analyticsRatios !== prevProps.data.analyticsRatios) {
      const { updateParent, data: { analyticsRatios } } = this.props;
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

  roundNumber = num => Math.round(num * 100) / 100;

  render() {
    const { isFutureDateSelected } = this.props.dateValue;
    const { loading, error, analyticsRatios } = this.props.data;
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
  data: PropTypes.shape({
    analyticsRatios: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
  }).isRequired,
  dateValue: PropTypes.shape({
    isFutureDateSelected: PropTypes.bool.isRequired,
  }).isRequired,
  queryCompleted: PropTypes.func.isRequired,
  updateParent: PropTypes.func,
};

Checkins.defaultProps = {
  updateParent: null,
};

export default compose(
  graphql(CHECKINS_BOOKINGS_CANCELLATIONS_PERCENTAGES, {
    name: 'data',
    options: props => ({
      variables: {
        startDate: props.dateValue.validatedStartDate,
        endDate: props.dateValue.validatedEndDate,
        page: 1,
        perPage: 5,
      },
    }),
  }),
)(Checkins);
