import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Dropdown from '../commons/Dropdown';
import '../../assets/styles/topmenu.scss';
import { settingsGearsIcon } from '../../utils/images/images';
import { removeItemFromLocalStorage } from '../../utils/Utilities';
import Constants from '../../utils/Constants';
import { clearCookies } from '../../utils/Cookie';
import ROUTES from '../../utils/routes';

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
    const { history: { push } } = this.props;
    removeItemFromLocalStorage(MRM_TOKEN);
    sessionStorage.removeItem('activeTopNav');
    clearCookies();
    push(ROUTES.home);
  };

  /**
   * 1. Renders Dropdown child components
   *
   * @returns {JSX}
   */
  dropOptions = () => (
    <span key={0} className="preference-dropdown-list">
      <NavLink className="preference-link" to="/preference">
        <div className="preference-div" >
          <li>
              Preferences
          </li>
        </div>
        <img type="image" alt="logout" src={settingsGearsIcon} className="preference-icon" />
      </NavLink>
      <div className="preference-border" />
      <button
        className="logout-btn"
        tabIndex={0}
        onClick={this.onLogOut}
      >
      Log Out
      </button>
    </span>
  );

  render() {
    return (
      <Dropdown
        isPreference
        content={this.dropOptions()}
      />
    );
  }
}

ProfileMenu.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(ProfileMenu);
