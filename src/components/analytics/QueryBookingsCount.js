import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import ErrorBoundary from '../commons/ErrorBoundary';
import graphColor from '../../fixtures/graphColor';
import ErrorIcon from '../../components/commons/ErrorIcon';
import { getBookingsCount } from '../../../src/components/helpers/QueriesHelpers';
import Overlay from '../commons/Overlay';

class QueryBookingsCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getBookingsCountAnalytics();
  }
  componentDidUpdate(prevProps, prevState) {
    const { dateValue: { startDate, endDate } } = this.props;
    const { startDate: prevStartDate, endDate: prevEndDate } = prevProps.dateValue;
    const { bookings } = this.state;

    if (prevStartDate !== startDate || prevEndDate !== endDate) {
      this.getBookingsCountAnalytics();
    }

    if (prevState.bookings !== bookings) {
      const { updateParent } = this.props;
      updateParent('totalBookingsCount', bookings);
    }
  }

  getBookingsCountAnalytics = async () => {
    const { dateValue } = this.props;
    const { bookings, loading } = this.state;
    if (!loading) this.setState({ loading: true });
    const bookingsAnalytics = await getBookingsCount(dateValue);
    let bookingsCount = Object.assign({}, bookings);
    bookingsCount = bookingsAnalytics.bookingsAnalyticsCount;
    this.setState({
      bookings: bookingsCount,
      loading: false,
    });
  };

  render() {
    const { loading, bookings = [{ bookings: 10, period: 'Apr 30 2019' }] } = this.state;

    if (bookings.length === 0) {
      return <ErrorIcon message="No resource found" />;
    }

    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: false,
    };

    const graphData = {
      labels: bookings.map(item => item.period),
      datasets: [
        {
          label: 'Bookings',
          backgroundColor: graphColor,
          hoverBackgroundColor: graphColor,
          data: bookings.map(item => item.bookings),
        },
      ],
    };
    return (
      <div>
        {loading && <Overlay />}
        <ErrorBoundary>
          <HorizontalBar data={graphData} options={options} height={300} />
        </ErrorBoundary>
      </div>
    );
  }
}

QueryBookingsCount.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
  updateParent: PropTypes.func,
};

QueryBookingsCount.defaultProps = {
  updateParent: null,
};

export default QueryBookingsCount;
