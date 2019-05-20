import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { pollRedIcon } from '../../utils/images/images';
import BookedRooms from './BookedRooms';
import { getMostBookedRooms } from '../../../src/components/helpers/QueriesHelpers';

export class QueryMostBookedRooms extends Component {
  state = {
    bookedRoomsList: [],
    loading: true,
  };

  componentDidMount() {
    this.getMostBookedRoomsAnalytics();
  }
  componentDidUpdate(prevProps, prevState) {
    const { bookedRoomsList } = this.state;
    const { updateParent, dateValue: { startDate, endDate } } = this.props;
    const { startDate: prevStartDate, endDate: prevEndDate } = prevProps.dateValue;

    if (prevStartDate !== startDate || prevEndDate !== endDate) {
      this.getMostBookedRoomsAnalytics();
    }
    if (prevState.bookedRoomsList !== bookedRoomsList) {
      updateParent('leastBookedRooms', bookedRoomsList);
    }
  }

  getMostBookedRoomsAnalytics = async () => {
    const { dateValue } = this.props;
    if (!this.state.loading) this.setState({ loading: true });
    const analyticsForMostBookedRooms = await getMostBookedRooms(dateValue);
    const { analyticsForBookedRooms } = analyticsForMostBookedRooms;
    this.setState({
      bookedRoomsList: analyticsForBookedRooms.analytics,
      loading: false,
    });
  };

  render() {
    const { bookedRoomsList, loading } = this.state;
    return (
      <Fragment>
        <BookedRooms
          pollIcon={pollRedIcon}
          tip="The highest number of times meeting rooms were booked in a set time period"
          bookedRoomText="Most Booked Rooms"
          fetching={loading}
          bookedRoomsList={bookedRoomsList || []}
        />
      </Fragment>
    );
  }
}

QueryMostBookedRooms.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
  updateParent: PropTypes.func,
};

QueryMostBookedRooms.defaultProps = {
  updateParent: null,
};

export default QueryMostBookedRooms;
