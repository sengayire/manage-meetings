import React from 'react';
import '../assets/styles/topmenu.scss';
import Logo from '../assets/images/converge_logo.svg';
import IconSearch from '../assets/images/search_icon.svg';
import IconNotifications from '../assets/images/notifications_icon.svg';
import { decodeTokenAndGetUserData } from '../utils/Cookie';

const TopMenu = () => {
  // get loggedin user data
  const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
  // rename some variables to camel case
  const { first_name: firstName, last_name: lastName, picture } = userData || {};
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
              <input className="search-bar" type="text" placeholder="Search" />
              <img className="search-icon" src={IconSearch} alt="Search icon" />
            </form>
          </div>
          <div className="container side-nav">
            <div className="notifications">
              <img src={IconNotifications} alt="Notification icon" />
            </div>
            <div className="profile">
              <img src={picture} style={{ height: '34px', width: '34px', borderRadius: '17px' }} alt="Profile icon" />
            </div>
            <div className="container">
              <span className="username">{`${firstName} ${lastName}`}</span>
              <i className="material-icons dropdown">arrow_drop_down</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
