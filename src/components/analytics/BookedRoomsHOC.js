import React from 'react';
import { PropTypes } from 'prop-types';
import PollIcon from '../../assets/images/poll.svg';
import RedPollIcon from '../../assets/images/poll_red.svg';
import MoreIcon from '../../assets/images/more.svg';
// import leastBookedRooms from '../../fixtures/leastBookedRooms';
import mostBookedRooms from '../../fixtures/mostBookedRooms';
import { getMostUsedAndLeastUsedRooms } from '../../json_requests';
import { thisWeek } from '../../utils/Utilities';

export class ComposedBooked extends React.Component {
  state = {
    leastUsedRooms: [],
    fetching: false,
    // eslint-disable-next-line
    error: null,
  };
  componentWillReceiveProps({ dateValue }) {
    this.fetchMostAndLeastUsedRooms(dateValue);
  }
  fetchMostAndLeastUsedRooms = (dateValue) => {
    this.setState({ fetching: true });
    let startDate;
    let endDate;
    if (dateValue === 'This Week') {
      const dates = thisWeek();
      startDate = dates.weekStart;
      endDate = dates.weekEnd;
    }

    return (
      getMostUsedAndLeastUsedRooms(startDate, endDate)
        .then((response) => {
          const rooms = response.data['Least Used Rooms'].Room;
          const meetings = response.data['Least Used Rooms'].Meetings;
          const meetingShares =
            response.data['Least Used Rooms']['% Share of All Meetings'];
          this.setState({
            leastUsedRooms: [rooms, meetings, meetingShares],
            fetching: false,
          });
        })
        // this fetching value is not set to false to avoid props validation
        // failure in the child component, otherwise it should be set to false
        // eslint-disable-next-line
        .catch((error) => this.setState({ fetching: true, error }))
    );
  };
  render() {
    const ComposedBookedRooms = this.props.component;
    if (this.props.bookedRoomText === 'Most Booked Rooms') {
      return (
        <ComposedBookedRooms
          pollIcon={PollIcon}
          moreIcon={MoreIcon}
          bookedRoomText={this.props.bookedRoomText}
          fetching={false}
          bookedRoomsList={mostBookedRooms}
        />
      );
    }
    return (
      <ComposedBookedRooms
        pollIcon={RedPollIcon}
        moreIcon={MoreIcon}
        bookedRoomText={this.props.bookedRoomText}
        fetching={this.state.fetching}
        bookedRoomsList={this.state.leastUsedRooms}
      />
    );
  }
}

ComposedBooked.propTypes = {
  dateValue: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  bookedRoomText: PropTypes.string.isRequired,
};

export default ComposedBooked;
