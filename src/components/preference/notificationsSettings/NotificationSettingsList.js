import React from 'react';
import { Query } from 'react-apollo';
import '../../../assets/styles/notificationSettingsList.scss';
import GET_NOTIFICATION_STATUS from '../../../graphql/queries/Preferences';
import notificationSettings from '../../../fixtures/notificationSettings';
import MeetingNotifications from './MeetingNotifications';
import DeviceNotifications from './DeviceNotifications';
import CheckInWindowSettings from '../eventCustomisation/checkInWindowSettings';

/**
 * notification preferences
 */
const NotificationSettingsList = () => (
  <Query query={GET_NOTIFICATION_STATUS}>
    {({ loading, error, data }) => {
      if (loading) return <h2>Loading...</h2>;
      if (error) return <h2>Error...</h2>;

      const {
        deviceHealthNotification,
        meetingUpdateNotification,
      } = data.getUserNotificationSettings[0];
      return (
        <section className="preference-main">
          <h1>Notification Settings</h1>
          <MeetingNotifications
            title={notificationSettings.meeting.title}
            body={notificationSettings.meeting.body}
            meeting={meetingUpdateNotification}
          />
          <DeviceNotifications
            title={notificationSettings.device.title}
            body={notificationSettings.device.body}
            device={deviceHealthNotification}
          />
          <CheckInWindowSettings />
        </section>
      );
    }}
  </Query>
);

export default NotificationSettingsList;
