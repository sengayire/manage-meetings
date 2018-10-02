import React, { Fragment } from 'react';
import NotificationSettingsList from '../components/preference/notificationsSettings/NotificationSettingsList';
import NavBar from './NavBar';
import '../assets/styles/preference.scss';

/**
 * render all preference settings
 */
const Preference = () => (
  <Fragment>
    <NavBar />
    <div className="preference-container">
      <NotificationSettingsList />
    </div>
  </Fragment>
);

export default Preference;
