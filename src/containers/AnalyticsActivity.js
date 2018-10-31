import React, { Component } from 'react';
import '../assets/styles/analyticsActivity.scss';
import UsersIcon from '../assets/images/Group.svg';

export class AnalyticsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="meeting-title">
          <div className="title-heading">Meeting Title</div>
          <div className="room-heading">Booked Room</div>
          <div className="status-heang">Status</div>
          <div className="participant-heading">Participants</div>
        </div>

        <div className="activity">
          <div className="activity-day">Today</div>

          <div className="activity-info-row">
            <div className="title">
              <div>Travela Backlog Grooming Started</div>
              <div className="time">11:35 am - 12:30 pm</div>
            </div>
            <div className="room">Cognito</div>
            <div className="status">
              <div className="started">
                Started <bdi>11:40am</bdi>
              </div>
              <div className="ended">
                Ended <bdi>11:40am</bdi>
              </div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>20</span>
            </div>
          </div>

          <div className="activity-info-row">
            <div className="title">
              <div>Converge Sprint Planning Cancelled</div>
              <div className="time">09:30 am - 10:30 pm</div>
            </div>
            <div className="room">Ol Karia</div>
            <div className="status">
              <div className="cancelled">Cancelled</div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>11</span>
            </div>
          </div>

          <div className="activity-info-row">
            <div className="title">
              <div>Olamide Jolomi Sync</div>
              <div className="time">09:30 am - 10:30 pm</div>
            </div>
            <div className="room">Amara</div>
            <div className="status">
              <div className="started">
                Started <bdi>02:30pm</bdi>
              </div>
              <div className="ended">
                Ended <bdi>03:00pm</bdi>
              </div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>2</span>
            </div>
          </div>

          <div className="activity-info-row">
            <div className="title">
              <div>Activo Backlog Grooming</div>
              <div className="time">11:35 am - 12:30 pm</div>
            </div>
            <div className="room">Cairo</div>
            <div className="status">
              <div className="started">
                Started <bdi>11:40am</bdi>
              </div>
              <div className="ended">
                Ended <bdi>11:40am</bdi>
              </div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>18</span>
            </div>
          </div>
        </div>

        <div className="activity">
          <div className="activity-day">Friday October 6</div>

          <div className="activity-info-row">
            <div className="title">
              <div>Travela Backlog Grooming Started</div>
              <div className="time">11:35 am - 12:30 pm</div>
            </div>
            <div className="room">Cognito</div>
            <div className="status">
              <div className="started">
                Started <bdi>11:40am</bdi>
              </div>
              <div className="ended">
                Ended <bdi>11:40am</bdi>
              </div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>17</span>
            </div>
          </div>

          <div className="activity-info-row">
            <div className="title">
              <div>Converge Sprint Planning Cancelled</div>
              <div className="time">09:30 am - 10:30 pm</div>
            </div>
            <div className="room">Ol Karia</div>
            <div className="status">
              <div className="cancelled">Cancelled</div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>12</span>
            </div>
          </div>

          <div className="activity-info-row">
            <div className="title">
              <div>Olamide Jolomi Sync</div>
              <div className="time">09:30 am - 10:30 pm</div>
            </div>
            <div className="room">Amara</div>
            <div className="status">
              <div className="started">
                Started <bdi>02:30pm</bdi>
              </div>
              <div className="ended">
                Ended <bdi>03:00pm</bdi>
              </div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>2</span>
            </div>
          </div>

          <div className="activity-info-row">
            <div className="title">
              <div>Activo Backlog Grooming</div>
              <div className="time">11:35 am - 12:30 pm</div>
            </div>
            <div className="room">Cairo</div>
            <div className="status">
              <div className="started">
                Started <bdi>11:40am</bdi>
              </div>
              <div className="ended">
                Ended <bdi>11:40am</bdi>
              </div>
            </div>
            <div className="participants">
              <img src={UsersIcon} alt="" />
              <span>15</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AnalyticsActivity;
