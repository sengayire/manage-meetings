/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import '../../assets/styles/topnav.scss';
import IconAnalytics from '../../assets/images/analytics_icon.svg';
import IconFeedback from '../../assets/images/feedback_icon.svg';
import IconSettings from '../../assets/images/settings_icon.svg';


const menuItems = [
  { route: ROUTES.analytics, menu: 'Analytics', icon: IconAnalytics },
  { route: ROUTES.settings, icon: IconSettings, menu: 'Settings' },
  { icon: IconFeedback, route: ROUTES.feedback, menu: 'Room Feedback' },
];

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    let { pathname } = props.location;

    if (pathname === '/' || pathname === '/analytics') {
      pathname = ROUTES.analytics;
    }

    menuItems.forEach((router) => {
      if (pathname.includes(router.route)) {
        this.state = {
          activeMenu: router.menu,
        };
      }
    });
  }

  handleClick = menuItem => () => {
    this.setState({ activeMenu: menuItem });
  };

  render() {
    const { activeMenu } = this.state;
    return (
      <div className="top-nav">
        <ul className="converge-menu">
          {menuItems.map(item => (
            <li key={item.menu} className={activeMenu === item.menu ? 'active' : ''} >
              <Link
                to={item.menu === 'Settings' ? ROUTES.settingsOffices : item.route}
                onClick={this.handleClick(item.menu)}
                className="converge-link"
              >
                <span>
                  <img src={item.icon} alt={item.menu} />
                </span>{item.menu}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(TopNav);
