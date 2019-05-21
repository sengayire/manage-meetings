import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import '../assets/styles/analyticsActivity.scss';
import { groupIcon } from '../utils/images/images';
import dateChecker from '../utils/checkDate';
import Overlay from '../components/commons/Overlay';
import { getAnalyticForDailyRoomsEvents, getUserDetails } from '../components/helpers/QueriesHelpers';
import ErrorIcon from '../components/commons/ErrorIcon';
import meetings from '../utils/activityData';

export class AnalyticsActivity extends Component {
  state = {
    analyticsForDailyRoomEvents: meetings,
    loading: true,
    location: '',
  };

  componentDidMount() {
    this.getAnalyticsForDailyRoomEvents();
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { analyticsForDailyRoomEvents } = this.state;
    if (
      analyticsForDailyRoomEvents.DailyRoomEvents &&
      analyticsForDailyRoomEvents.DailyRoomEvents.length !== 0 &&
      prevState.analyticsForDailyRoomEvents !== analyticsForDailyRoomEvents
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

  getAnalyticsForDailyRoomEvents = async () => {
    const { dateValue } = this.props;
    const { analyticsForDailyRoomEvents } = await getAnalyticForDailyRoomsEvents(dateValue);
    this.setState({
      analyticsForDailyRoomEvents,
      loading: false,
    });
  };


  getLocation = async () => {
    const user = await getUserDetails();
    this.setState({
      location: user.location,
    });
  }

  meetingsData = dailyActivityData => (
    <div>
      {dailyActivityData.map(meeting => (
        <div className="activity" key={uuid()}>
          <div className="activity-day">{dateChecker(meeting.day) ? 'Today' : meeting.day}</div>
          <div>
            {meeting.events.map(event => (
              <div className="activity-info-row" key={uuid()}>
                <div className="title">
                  <div>{event.eventSummary}</div>
                </div>
                <div className="room">{event.roomName}</div>
                {event.cancelled ? (
                  <div className="status">
                    <div className="cancelled">Cancelled</div>
                  </div>
                ) : (
                  <div className="status">
                    <div className="started">
                      Started <bdi>{event.startTime} { this.state.location === 'Lagos' ? 'WAT' : 'EAT'}</bdi>
                    </div>
                    <div className="ended">
                      Ended <bdi>{event.endTime} { this.state.location === 'Lagos' ? 'WAT' : 'EAT'}</bdi>
                    </div>
                  </div>
                )}
                <div className="participants">
                  <img src={groupIcon} alt="" />
                  <span>{event.noOfParticipants}</span>
                </div>
              </div>
            ))}
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
    const { loading, analyticsForDailyRoomEvents } = this.state;
    if (loading && analyticsForDailyRoomEvents.DummyDailyRoomEvents) {
      return (
        <center className="room__events">
          {this.renderDailyRoomEvents()}
          <Overlay id="average-meeting" />
          {this.meetingsData(analyticsForDailyRoomEvents.DummyDailyRoomEvents)}
        </center>
      );
    } else if (analyticsForDailyRoomEvents.DailyRoomEvents.length === 0) {
      return (
        <div className="activity_error">
          <ErrorIcon message="No resource found" />
        </div>
      );
    }
    return (
      <center className="room__events">
        {this.renderDailyRoomEvents()}
        {this.meetingsData(analyticsForDailyRoomEvents.DailyRoomEvents)}
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
