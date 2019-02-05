import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '../../utils/routes';

/**
 * 1. Lists all the settings items on the left side nav bar
 *
 * @returns {JSX}
 */
const SettingsNav = () => (
  <div className="settings-tabs">
    <ul>
      <li>
        <NavLink to={ROUTES.settingsCenters} activeClassName="active">Centers</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsOffices} >
          Offices
        </NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsBlocks}>Blocks</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.floors}>Floors</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsWings}>Wings</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsRooms}>Rooms</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsAmenities}>Resources</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsPeople}>People</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.settingsDevices}>Devices</NavLink>
      </li>
    </ul>
  </div>
);

export default SettingsNav;
