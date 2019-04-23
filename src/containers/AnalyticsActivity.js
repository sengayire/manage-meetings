import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import '../assets/styles/analyticsActivity.scss';
import { groupIcon } from '../utils/images/images';
import dateChecker from '../utils/checkDate';
import Spinner from '../components/commons/Spinner';
import { ANALYTICS_FOR_DAILY_ROOM_EVENTS } from '../graphql/queries/analytics';

export class AnalyticsActivity extends Component {
  state = {};

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
                <div className="status">
                  <div className="started">
                    Started <bdi>{event.startTime}</bdi>
                  </div>
                  <div className="ended">
                    Ended <bdi>{event.endTime}</bdi>
                  </div>
                </div>
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

  render() {
    const {
      dateValue: { startDate, endDate },
    } = this.props;
    return (
      <Query
        query={ANALYTICS_FOR_DAILY_ROOM_EVENTS}
        variables={{
          startDate,
          endDate,
        }}
      >
        {({ data: { analyticsForDailyRoomEvents }, loading }) => {
          if (loading) {
            return (
              <center>
                <Spinner />
              </center>
            );
          }

          return (
            <Fragment>
              <div className="meeting-title">
                <div className="title-heading">Meeting Title</div>
                <div className="room-heading">Booked Room</div>
                <div className="status-heading">Status</div>
                <div className="participant-heading">Participants</div>
              </div>
              {this.meetingsData(analyticsForDailyRoomEvents.DailyRoomEvents)}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
export default AnalyticsActivity;

AnalyticsActivity.propTypes = {
  dateValue: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
};
