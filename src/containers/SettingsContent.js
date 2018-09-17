import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SettingsNav from '../components/navbars/SettingsNav';
import OfficeList from '../components/OfficeList';
import ResourceList from '../components/ResourceList';
import '../assets/styles/settingscontent.scss';
import ROUTES from '../utils/routes';
import PlaceHolder from '../components/Placeholder';
import RoomsList from '../components/RoomsList';
import PeopleList from '../components/people/PeopleList';
import DeviceList from '../components/DeviceList';

// replace the PlaceHolder component with appropriate component to be rendered
const SettingsContent = () => (
  <div className="settings-vertical">
    <SettingsNav />
    <div className="settings-tab-content">
      <Switch>
        <Route exact path={ROUTES.settingsOffices} component={OfficeList} />
        <Route exact path={ROUTES.settingsRooms} component={RoomsList} />
        <Route exact path={ROUTES.settingsAmenities} component={ResourceList} />
        <Route exact path={ROUTES.settingsPeople} component={PeopleList} />
        <Route exact path={ROUTES.settingsDevices} component={DeviceList} />
        <Route exact path={ROUTES.settingsIntegrations} component={PlaceHolder} />
        <Redirect from="/settings" to="/settings/offices" />
      </Switch>
    </div>
  </div>
);

export default SettingsContent;
