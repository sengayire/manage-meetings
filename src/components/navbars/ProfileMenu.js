import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import '../../assets/styles/topmenu.scss';
import { removeItemFromLocalStorage } from '../../utils/Utilities';
import Constants from '../../utils/Constants';
import { clearCookies } from '../../utils/Cookie';

// destructor constants to be used
const { MRM_TOKEN } = Constants;

/**
 * Component for Profile Menu
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
class ProfileMenu extends React.Component {
  /**
   * 1. Clear cookies when a user logs out
   * 2. Refresh the page
   *
   * @returns {Function}
   */
  onLogOut = () => {
    removeItemFromLocalStorage(MRM_TOKEN);
    clearCookies();
    window.location.reload();
  };

  render() {
    return (
      <IconMenu
        className="material-icons profile-dropdown"
        icon="arrow_drop_down"
      >
        <NavLink to="/preference">
          <MenuItem className="profile-menu" caption="Preference" />
        </NavLink>
        <MenuItem
          className="profile-menu"
          caption="LOGOUT"
          onClick={() => {
            this.onLogOut();
          }}
        />
      </IconMenu>
    );
  }
}

export default ProfileMenu;
