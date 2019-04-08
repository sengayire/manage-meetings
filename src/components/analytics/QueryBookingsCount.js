import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import ErrorBoundary from '../commons/ErrorBoundary';
import graphColor from '../../fixtures/graphColor';
import Spinner from '../commons/Spinner';
import ErrorIcon from '../../components/commons/ErrorIcon';
import { getBookingsCount } from '../../../src/components/helpers/QueriesHelpers';

class QueryBookingsCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getBookingsCountAnalytics();
  }
  componentDidUpdate(prevProps, prevState) {
    const { bookings } = this.state;
    if (prevState.bookings !== bookings) {
      const { updateParent } = this.props;
      updateParent('totalBookingsCount', bookings);
    }
  }

  getBookingsCountAnalytics = async () => {
    const { dateValue } = this.props;
    const { bookings } = this.state;
    const bookingsAnalytics = await getBookingsCount(dateValue);
    let bookingsCount = Object.assign({}, bookings);
    bookingsCount = bookingsAnalytics.bookingsAnalyticsCount;
    this.setState({
      bookings: bookingsCount,
      loading: false,
    });
  };

  render() {
    const { loading, bookings } = this.state;
    if (loading) {
      return <Spinner />;
    }
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
