import React from 'react';
import { PropTypes } from 'prop-types';
import PollIcon from '../../assets/images/poll.svg';
import RedPollIcon from '../../assets/images/poll_red.svg';
import MoreIcon from '../../assets/images/more.svg';
import { getMostUsedAndLeastUsedRooms } from '../../json_requests';
import {
  thisWeek,
  getFirstDayOfTheMonth,
  getTodaysDate,
} from '../../utils/Utilities';

export class ComposedBooked extends React.Component {
  state = {
    leastUsedRooms: [],
    mostUsedRooms: [],
    fetching: false,
    // eslint-disable-next-line
    error: null,
  };

  componentDidMount() {
    this.fetchMostAndLeastUsedRooms(this.props.dateValue);
  }

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
    } else if (dateValue === 'This Month') {
      startDate = getFirstDayOfTheMonth();
      endDate = getTodaysDate();
    } else if (dateValue === 'Today') {
      startDate = getTodaysDate();
      endDate = getTodaysDate();
    }

    return (
      getMostUsedAndLeastUsedRooms(startDate, endDate)
        .then((response) => {
          const rooms = response.data['Least Used Rooms'].Room;
          const meetings = response.data['Least Used Rooms'].Meetings;
          const meetingShares =
            response.data['Least Used Rooms']['% Share of All Meetings'];

          const mostUsedRooms = response.data['Most Used Rooms'].Room;
          const mostUsedMeetings = response.data['Most Used Rooms'].Meetings;
          const mostUsedMeetingShares =
            response.data['Most Used Rooms']['% Share of All Meetings'];

          this.setState({
            leastUsedRooms: [rooms, meetings, meetingShares],
            mostUsedRooms: [
              mostUsedRooms,
              mostUsedMeetings,
              mostUsedMeetingShares,
            ],
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
          fetching={this.state.fetching}
          bookedRoomsList={this.state.mostUsedRooms}
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
  dateValue: PropTypes.string,
  component: PropTypes.func.isRequired,
  bookedRoomText: PropTypes.string.isRequired,
};

ComposedBooked.defaultProps = {
  dateValue: 'Today',
};

export { ComposedBooked as default, getMostUsedAndLeastUsedRooms };
