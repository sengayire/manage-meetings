import React, { Fragment } from 'react';
import TopMenu from '../components/navbars/TopMenu';
import NotificationSettingsList from '../components/preference/notificationsSettings/NotificationSettingsList';
import '../assets/styles/preference.scss';
import ROUTES from '../utils/routes';
import BackArrow from '../../src/components/commons/BackArrow';

/**
 * render all preference settings
 */
const Preference = () => (
  <Fragment>
    <TopMenu />
    <div className="preference-container">
      <BackArrow redirectUri={ROUTES.analytics} />
      <NotificationSettingsList />
    </div>
  </Fragment>
);

export default Preference;
