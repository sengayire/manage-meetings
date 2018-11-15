import React, { Component } from 'react';
import '../assets/styles/analyticsActivity.scss';
import UsersIcon from '../assets/images/Group.svg';
import meetings from '../utils/nonPersistentData';

export class AnalyticsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: meetings(),
    };
  }

  meetingsData = date =>
    (
      <div className="activity">
        <div className="activity-day">{date}</div>
        {this.state.meetings.map(meeting => (
          <div key={meeting.meetingId} className="activity-info-row">
            <div className="title">
              <div>{meeting.meetingTitle}</div>
              <div className="time">{meeting.duration}</div>
            </div>
            <div className="room">{meeting.bookedRoom}</div>
            {meeting.status.status === 'started' ? (
              <div className="status">
                <div className="started">
                  Started <bdi>{meeting.status.startTime}</bdi>
                </div>
                <div className="ended">
                  Ended <bdi>{meeting.status.endTime}</bdi>
                </div>
              </div>
            ) : (
              <div className="status">
                <div className="cancelled">Cancelled</div>
              </div>
              )}

            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>{meeting.participants}</span>
            </div>
          </div>

        ))}
      </div>
    );

  render() {
    return (
      <div>
        <div className="meeting-title">
          <div className="title-heading">Meeting Title</div>
          <div className="room-heading">Booked Room</div>
          <div className="status-heang">Status</div>
          <div className="participant-heading">Participants</div>
        </div>
        {this.meetingsData('Today')}
        {this.meetingsData('Friday October 6')}
      </div>
    );
  }
}
export default AnalyticsActivity;
