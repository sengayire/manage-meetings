import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SettingsNav from '../components/SettingsNav';
import OfficeList from '../components/OfficeList';
import AmenityList from '../components/AmenityList';
import '../assets/styles/settingscontent.scss';
import ROUTES from '../utils/routes';
import PlaceHolder from '../components/Placeholder';

// replace the PlaceHolder component with appropriate component to be rendered
const SettingsContent = () => (
  <div className="settings-vertical">
    <SettingsNav />
    <div className="settings-tab-content">
      <Switch>
        <Route exact path={ROUTES.settingsOffices} component={OfficeList} />
        <Route exact path={ROUTES.settingsRooms} component={PlaceHolder} />
        <Route exact path={ROUTES.settingsAmenities} component={AmenityList} />
        <Route exact path={ROUTES.settingsPeople} component={PlaceHolder} />
        <Route exact path={ROUTES.settingsDevices} component={PlaceHolder} />
        <Route exact path={ROUTES.settingsIntegrations} component={PlaceHolder} />
        <Redirect from="/settings" to="/settings/offices" />
      </Switch>
    </div>
  </div>
);

export default SettingsContent;
