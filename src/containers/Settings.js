import React, { Component, Fragment } from 'react';
import { NavBar } from '../components';
import SettingsContent from './SettingsContent';

import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/settingscontent.scss';
import '../assets/styles/settingsnav.scss';
import '../assets/styles/settingsoffices.scss';

class Settings extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <SettingsContent />
      </Fragment>
    );
  }
}

export default Settings;
