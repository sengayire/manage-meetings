import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '../../utils/routes';

const SettingsNav = () => (
  <div className="settings-tabs">
    <ul>
      <li><NavLink to={ROUTES.settingsOffices} activeClassName="active">Offices</NavLink></li>
      <li><NavLink to={ROUTES.settingsRooms}>Room</NavLink></li>
      <li><NavLink to={ROUTES.settingsAmenities}>Resources</NavLink></li>
      <li><NavLink to={ROUTES.settingsPeople}>People</NavLink></li>
      <li><NavLink to={ROUTES.settingsDevices}>Devices</NavLink></li>
      <li><NavLink to={ROUTES.settingsIntegrations}>Integrations</NavLink></li>
    </ul>
  </div>
);

export default SettingsNav;
