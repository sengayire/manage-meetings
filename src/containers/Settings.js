import React, { Fragment } from 'react';

import { NavBar } from '../components';
import SettingsContent from './SettingsContent';
import '../assets/styles/custom.scss';

const Settings = () => (
  <Fragment>
    <NavBar />
    <SettingsContent />
  </Fragment>
);

export default Settings;

