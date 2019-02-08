import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SettingsNav from '../components/navbars/SettingsNav';
import OfficeList from '../components/offices/OfficeList'; //eslint-disable-line
import ResourceList from '../components/resources/ResourceList'; //eslint-disable-line
import '../assets/styles/settingscontent.scss';
import ROUTES from '../utils/routes';
import PlaceHolder from '../components/commons/Placeholder';
import RoomsList from '../components/rooms/RoomsList'; //eslint-disable-line
import PeopleList from '../components/people/PeopleList'; //eslint-disable-line
import DeviceList from '../components/devices/DeviceList';
import BlocksList from '../components/blocks/BlocksList'; //eslint-disable-line
import FloorList from '../components/floors/FloorList'; //eslint-disable-line
import WingList from '../components/wing/wingList'; //eslint-disable-line
import CenterList from '../components/centers/CenterList'; //eslint-disable-line
import { decodeTokenAndGetUserData } from '../utils/Cookie';
import Maintenance from '../assets/images/maintenance.svg';

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

const authorizedUser = [
  'oluwatobi.otokiti@andela.com',
  'joshua.ocero@andela.com',
  'adinoyi.sadiq@andela.com',
  'angule.mathias@andela.com',
  'egwuenu.gift@andela.com',
  'gidraf.orenja@andela.com',
  'mubarak.ruganda@andela.com',
  'stephen.byarugaba@andela.com',
  'paul.gathegu@andela.com',
  'tersoo.atsen@andela.com',
  'walter.nyeko@andela.com',
  'kevin.bett@andela.com',
  'olayemi.lawal@andela.com',
  'welike.amos@andela.com',
  'bonifase.orwa@andela.com',
  'karen.kinoti@andela.com',
  'ademola.hussain@andela.com',
  'emmanuel.chayu@andela.com',
  'nnaemeka.okoro@andela.com',
  'bill.twinomuhwezi@andela.com',
  'brian.cheruiyot@andela.com',
  'davis.kimame@andela.com',
];

/* istanbul ignore next */
const isAuthorizedUser = userData && !authorizedUser.includes(userData.email);

// replace the PlaceHolder component with appropriate component to be rendered
const SettingsContent = () => (
  <div className="outer-div">
    {isAuthorizedUser &&
    /* istanbul ignore next */
      <div className="overlay-div">
        <div className="overlay-div__content">
          <img src={Maintenance} alt="Notice" /><br />
          <span>Oops!!! Page is under maintenance</span>
        </div>
      </div>
    }
    <div className={`settings-vertical ${isAuthorizedUser && /* istanbul ignore next */ 'blur-background'}`}>
      <SettingsNav />
      <div className="settings-tab-content">
        <Switch>
          <Route exact path={ROUTES.settingsCenters} component={CenterList} />
          <Route exact path={ROUTES.settingsOffices} component={OfficeList} />
          <Route exact path={ROUTES.floors} component={FloorList} />
          <Route exact path={ROUTES.settingsRooms} component={RoomsList} />
          <Route exact path={ROUTES.settingsBlocks} component={BlocksList} />
          <Route exact path={ROUTES.settingsAmenities} component={ResourceList} />
          <Route exact path={ROUTES.settingsPeople} component={PeopleList} />
          <Route exact path={ROUTES.settingsDevices} component={DeviceList} />
          <Route
            exact
            path={ROUTES.settingsIntegrations}
            component={PlaceHolder}
          />
          <Route exact path={ROUTES.settingsIntegrations} component={PlaceHolder} />
          <Route exact path={ROUTES.settingsWings} component={WingList} />
          <Redirect from="/settings" to="/analytics" />
        </Switch>
      </div>
    </div>
  </div>
);

export default SettingsContent;
