/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import '../../assets/styles/topnav.scss';
import { analyticsIcon, feedbackIcon, settingsIcon } from '../../utils/images/images';

const menuItems = [
  {
    route: ROUTES.analytics, menu: 'Analytics', icon: analyticsIcon, admin: false,
  },
  {
    route: ROUTES.setup, icon: settingsIcon, menu: 'Setup', admin: true,
  },
  {
    icon: feedbackIcon, route: ROUTES.roomfeedback, menu: 'Room Feedback', admin: true,
  },
];

/**
 * Component for the top navigation bar
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
    };
    let { pathname } = props.location;

    if (pathname === '/' || pathname === '/analytics') {
      pathname = ROUTES.analytics;
    }
  }

  async componentDidMount() {
    await this.setActiveMenu();
  }

  setActiveMenu = async () => {
    await menuItems.forEach((router) => {
      if (this.props.location.pathname.includes(router.route)) {
        this.setState({
          activeMenu: router.menu,
        });
      }
    });
  };


  /**
   * 1. Set chosen item as the active menu
   *
   * @param {string} menuItem
   *
   * @returns {void}
   */
  handleClick = menuItem => () => {
    this.setState({ activeMenu: menuItem });
  };

  renderNavigation = (activeMenu, userRole, navItems) =>
    navItems.map((item) => {
      if (item.admin && userRole === 'Default User') {
        return null;
      }
      return (
        <li
          key={item.menu}
          className={activeMenu === item.menu ? 'active' : ''}
        >
          <Link
            to={item.menu === 'Setup' ? ROUTES.setup : item.route}
            onClick={this.handleClick(item.menu)}
            className="converge-link"
          >
            <span>
              <img src={item.icon} alt={item.menu} className="svg-nav" />
            </span>
            {item.menu}
          </Link>
        </li>
      );
    });

  render() {
    const {
      state: { activeMenu },
      props: { userRole },
    } = this;
    return (
      <div className="top-nav">
        <ul className="converge-menu">
          {userRole ? this.renderNavigation(activeMenu, userRole, menuItems) : null}
        </ul>
      </div>
    );
  }
}

export default withRouter(TopNav);
