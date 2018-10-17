import React, { Fragment } from 'react';
import notificationSettings from '../../../fixtures/notificationSettings';
import NotificationSetting from './NotificationSetting';
import '../../../assets/styles/notificationSettingsList.scss';
// import CancelledEvent from '../emailTemplates/CancelledEvent';

const notificationComponent = notificationSettings.map(notification => (
  <NotificationSetting
    key={notification.title}
    title={notification.title}
    body={notification.body}
  />
));

/**
 * notification preferences
 */
const NotificationSettingsList = () => (
  <Fragment>
    <section className="preference-main">
      <h1>Notification Settings</h1>
      {notificationComponent}
    </section>
    {/* <CancelledEvent /> */}
  </Fragment>
);

export default NotificationSettingsList;
