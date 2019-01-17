import React from 'react';
import { PropTypes } from 'prop-types';
import PollIcon from '../../assets/images/poll.svg';
import RedPollIcon from '../../assets/images/poll_red.svg';
import { getMostUsedAndLeastUsedRooms } from '../../json_requests';

/**
 * Component for showing booked rooms HOC
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
export class ComposedBooked extends React.Component {
  state = {
    leastUsedRooms: [],
    mostUsedRooms: [],
    fetching: false,
    // eslint-disable-next-line
    error: null
  };

  componentDidMount() {
    this.fetchMostAndLeastUsedRooms(this.props.date);
  }

  componentWillReceiveProps(prevProps) {
    if (this.props.date.startDate !== prevProps.date.startDate) {
      this.fetchMostAndLeastUsedRooms(prevProps.date);
    }
  }

  /**
   * Fetches most and least used rooms
   *
   * @param {date} date
   *
   * @returns {Function}
   */
  fetchMostAndLeastUsedRooms = (date) => {
    this.setState({ fetching: true });
    const { startDate, endDate } = date;

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
        .catch(error => this.setState({ fetching: false, error: error }))
    );
  };

  render() {
    const ComposedBookedRooms = this.props.component;
    if (this.props.bookedRoomText === 'Most Booked Rooms') {
      return (
        <ComposedBookedRooms
          pollIcon={PollIcon}
          tip="The highest number of times meeting rooms were booked in a set time period"
          bookedRoomText={this.props.bookedRoomText}
          fetching={this.state.fetching}
          error={this.state.error}
          bookedRoomsList={this.state.mostUsedRooms}
        />
      );
    }
    return (
      <ComposedBookedRooms
        pollIcon={RedPollIcon}
        tip="The least number of times meeting rooms were booked in a set time period"
        bookedRoomText={this.props.bookedRoomText}
        fetching={this.state.fetching}
        error={this.state.error}
        bookedRoomsList={this.state.leastUsedRooms}
      />
    );
  }
}

ComposedBooked.propTypes = {
  date: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  component: PropTypes.func.isRequired,
  bookedRoomText: PropTypes.string.isRequired,
};

ComposedBooked.defaultProps = {
  date: {},
};

export { ComposedBooked as default, getMostUsedAndLeastUsedRooms };
