import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import ROUTES from '../utils/routes';
import '../assets/styles/topnav.scss';
import IconAnalytics from '../assets/images/analytics_icon.svg';
import IconFeedback from '../assets/images/feedback_icon.svg';
import IconSettings from '../assets/images/settings_icon.svg';

import NavLink from './helpers/NavLink';

const TopNav = () => (
  <div className="top-nav">
    <AppBar className="nav-app-bar">
      <Navigation type="horizontal">
        <NavLink
          to={ROUTES.analytics}
          label="Analytics"
          icon={<img src={IconAnalytics} alt="Analytics" />}
        />
        <NavLink
          to={ROUTES.settings}
          label="Settings"
          icon={<img src={IconSettings} alt="Settings" />}
        />
        <NavLink
          to={ROUTES.feedback}
          label="Room Feedback"
          icon={<img src={IconFeedback} alt="Room Feedback" />}
        />
      </Navigation>
    </AppBar>
  </div>
);

export default TopNav;
