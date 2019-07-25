import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import moment from 'moment';
import '../assets/styles/analyticsActivity.scss';
import { groupIcon } from '../utils/images/images';
import Overlay from '../components/commons/Overlay';
import { getAnalyticForDailyRoomsEvents, getUserDetails } from '../components/helpers/QueriesHelpers';
import ErrorIcon from '../components/commons/ErrorIcon';
import dateChecker from '../utils/checkDate';
import meetings from '../utils/activityData';
import Pagination from '../components/commons/Pagination';

export class AnalyticsActivity extends Component {
  state = {
    analyticsForDailyRoomEvents: meetings,
    allEvents: {},
    loading: true,
    location: '',
    error: false,
    currentPage: 1,
    perPage: 5,
    dataFetched: false,
    isFetching: false,
  };

  componentDidMount() {
    this.getAnalyticsForDailyRoomEvents();
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { analyticsForDailyRoomEvents } = this.state;
    if (
      analyticsForDailyRoomEvents.allEvents &&
      analyticsForDailyRoomEvents.allEvents.length !== 0 &&
      prevState.analyticsForDailyRoomEvents.allEvents !==
      analyticsForDailyRoomEvents.allEvents
    ) {
      this.props.queryCompleted('analyticsForDailyRoomEvents');
    }

    if (prevProps.dateValue !== this.props.dateValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        loading: true,
        analyticsForDailyRoomEvents: meetings,
      });
      this.getAnalyticsForDailyRoomEvents();
    }
  }

  getAnalyticsForDailyRoomEvents = async (perPage, page) => {
    const { dateValue } = this.props;
    this.setState({ isFetching: true });
    const analyticsForDailyRoomEvents =
      await getAnalyticForDailyRoomsEvents(dateValue, perPage, page);
    if (analyticsForDailyRoomEvents && analyticsForDailyRoomEvents.allEvents) {
      this.setState({
        allEvents: analyticsForDailyRoomEvents,
        currentPage: page,
        perPage,
        analyticsForDailyRoomEvents,
        loading: false,
        error: false,
        dataFetched: true,
        isFetching: false,
      });
    } else if (analyticsForDailyRoomEvents
        && analyticsForDailyRoomEvents
        === 'GraphQL error: Events do not exist for the date range'
    ) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  getLocation = async () => {
    const user = await getUserDetails();
    this.setState({
      location: user.location,
    });
  }

  formatTime = (dateTime) => {
    const date = moment(dateTime).format('hh:mm:ss');
    return date;
  }

  meetingsData = dailyActivityData => (
    <div>
      {dailyActivityData.events.map(event => (
        <div className="activity" key={uuid()}>
          <div className="activity-day">{dateChecker(event.startTime) ? 'Today' : moment(event.startTime).format('ddd ll')}</div>
          <div className="activity-info-row" key={uuid()}>
            <div className="title">
              <div>{event.eventTitle}</div>
            </div>
            <div className="room">{event.room.name}</div>
            {event.cancelled ? (
              <div className="status">
                <div className="cancelled">Cancelled</div>
              </div>
                ) : (
                  <div className="status">
                    <div className="started">
                      Started <bdi>{this.formatTime(event.startTime)} { this.state.location === 'Lagos' ? 'WAT' : 'EAT'}</bdi>
                    </div>
                    <div className="ended">
                      Ended <bdi>{this.formatTime(event.endTime)} { this.state.location === 'Lagos' ? 'WAT' : 'EAT'}</bdi>
                    </div>
                  </div>
                )}
            <div className="participants">
              <img src={groupIcon} alt="" />
              <span>{event.numberOfParticipants}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  renderDailyRoomEvents = () => (
    <div className="meeting-title">
      <div className="title-heading">Meeting Title</div>
      <div className="room-heading">Booked Room</div>
      <div className="status-heading">Status</div>
      <div className="participant-heading">Participants</div>
    </div>
  );

  render() {
    const {
      loading,
      error,
      analyticsForDailyRoomEvents,
      currentPage,
      perPage,
      dataFetched,
      allEvents,
      isFetching,
    } = this.state;
    if (loading) {
      return (
        <center className="room__events">
          {this.renderDailyRoomEvents()}
          <Overlay id="average-meeting" />
          {this.meetingsData(meetings.allEvents)}
        </center>
      );
    } else if (error) {
      return (
        <div className="activity_error">
          <ErrorIcon message="No event found" />
        </div>
      );
    }
    return (
      <center className="room__events">
        {this.renderDailyRoomEvents()}
        {isFetching ? <Overlay id="average-meeting" /> : null}
        {this.meetingsData(analyticsForDailyRoomEvents.allEvents)}
        {!error && Object.keys(allEvents).length > 0 && <Pagination
          hasNext={allEvents.allEvents.hasNext}
          hasPrevious={allEvents.allEvents.hasPrevious}
          totalPages={allEvents.allEvents.pages}
          handleData={this.getAnalyticsForDailyRoomEvents}
          dataFetched={dataFetched}
          currentPage={currentPage}
          perPage={perPage}
          isFetching={isFetching}
        />}
      </center>
    );
  }
}

AnalyticsActivity.propTypes = {
  queryCompleted: PropTypes.func.isRequired,
  dateValue: PropTypes.shape({
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export default AnalyticsActivity;
