import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookedRooms from './BookedRooms';
import { getLeastBookedRooms } from '../../../src/components/helpers/QueriesHelpers';

export class QueryLeastBookedRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookedRoomsList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getLeastBookedRoomsAnalytics();
  }

  componentDidUpdate(prevProps, prevState) {
    const { bookedRoomsList } = this.state;
    const { updateParent } = this.props;
    if (prevState.bookedRoomsList !== bookedRoomsList) {
      updateParent('leastBookedRooms', bookedRoomsList);
    }
  }

  getLeastBookedRoomsAnalytics = async () => {
    const { dateValue } = this.props;
    const { bookedRoomsList } = this.state;
    const analyticsForBookedRooms = await getLeastBookedRooms(dateValue);
    const { analytics } = analyticsForBookedRooms;
    let bookedRooms = Object.assign({}, bookedRoomsList);
    bookedRooms = analytics;
    this.setState({
      bookedRoomsList: bookedRooms,
      loading: false,
    });
  };

  render() {
    const { bookedRoomsList, loading } = this.state;
    return (
      <div>
        <BookedRooms
          tip="The least number of times meeting rooms were booked in a set time period"
          bookedRoomText="Least Booked Rooms"
          fetching={loading}
          error={bookedRoomsList}
          bookedRoomsList={bookedRoomsList}
        />
      </div>
    );
  }
}

QueryLeastBookedRooms.propTypes = {
  dateValue: PropTypes.instanceOf(Object).isRequired,
  updateParent: PropTypes.func,
};

QueryLeastBookedRooms.defaultProps = {
  updateParent: null,
};
export default QueryLeastBookedRooms;
