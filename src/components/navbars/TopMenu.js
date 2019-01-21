import React from 'react';
import ProfileMenu from './ProfileMenu';
import Logo from '../../assets/images/converge_logo.svg';
import IconSearch from '../../assets/images/search_icon.svg';
import IconNotifications from '../../assets/images/notifications_icon.svg';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import '../../assets/styles/topmenu.scss';

/**
 * Component for Top Menu
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
class TopMenu extends React.Component {
  componentDidMount() {}

  render() {
    const { UserInfo: userData } = decodeTokenAndGetUserData() || {};

    const { first_name: firstName, last_name: lastName, picture } =
      userData || {};

    return (
      <div className="top-menu">
        <div className="container size-2-8 nav-menu">
          <div className="container content-start nav-left">
            <ul className="inline nav-brand">
              <li className="logo">
                <img src={Logo} alt="Logo" />
              </li>
              <li className="logo-text">
                <h1>CONVERGE</h1>
              </li>
            </ul>
          </div>
          <div className="container content-end nav-right">
            <div className="search-box">
              <form className="container">
                <input className="search-bar" type="text" />
                <img
                  className="search-icon"
                  src={IconSearch}
                  alt="Search icon"
                />
              </form>
            </div>
            <div className="container side-nav">
              <div className="notifications">
                <img src={IconNotifications} alt="Notification icon" />
              </div>
              <div className="profile">
                <img src={picture} className="menu-icon" alt="Profile icon" />
              </div>
              <div className="profile-name">
                <span className="username">{`${firstName} ${lastName}`}</span>
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopMenu;
