/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileMenu from './ProfileMenu';
import { convergeLogoIcon, notificationsIcon } from '../../utils/images/images';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import '../../assets/styles/topmenu.scss';
import notification from '../../utils/notification';
import { changeUserLocation } from '../helpers/mutationHelpers/people';

/**
 * Component for Top Menu
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
export class TopMenuComponent extends React.Component {
  state = {
    query: '',
    showOptions: false,
    component: '',
    showLocations: false,
  };

  componentDidMount() {
    const userInfo = this.getUserInfoFromToken();

    this.updateUserInfo(userInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      query, showOptions, showLocations, component, ...prevUserInfo
    } = prevState;
    const currentUserInfo = this.getUserInfoFromToken();
    const stringify = data => JSON.stringify(data);
    if (stringify(prevUserInfo) !== stringify(currentUserInfo)) {
      this.updateUserInfo(currentUserInfo);
    }
  }

  getUserInfoFromToken = () => {
    const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
    const { first_name: firstName, last_name: lastName, picture } = userData || {};
    return { firstName, lastName, picture };
  };

  getLinks = component => <button onClick={() => this.setComponent(component)}>&nbsp;</button>;

  setComponent = component =>
    this.setState(
      {
        component,
        showOptions: false,
        showLocations: false,
      },
      this.setFocus,
    );

  setFocus = () => document.querySelector('.nav-menu input').focus();

  dateValue = () => {
    const { startDate, endDate, isFutureDateSelected } = this.state;

    return {
      startDate,
      endDate,
      isFutureDateSelected,
    };
  };

  handleSearch = (e) => {
    const { history } = this.props;
    const { component } = this.state;
    const key = e.keyCode || e.charCode;
    if (key === 13 || key === undefined) {
      e.preventDefault();
      if (!component) {
        return notification(toastr, 'error', 'Please select search criteria')();
      }
      return history.push({
        pathname: '/setup',
        state: {
          component,
          query: this.state.query,
        },
      });
    }
    return false;
  };

  addListener = () => {
    const { showOptions, component } = this.state;
    if (!showOptions && !component) {
      this.setState({ showOptions: true });
    }
    document.addEventListener('click', this.handleOutsideClick);
  };

  handleOutsideClick = ({ target }) => {
    if (this.globalSearch && this.globalSearch.contains(target)) return;

    this.setState({ showOptions: false }, () => {
      document.removeEventListener('click', this.handleOutsideClick);
    });
  };

  inputRef = React.createRef();

  toggleOptions = value => this.setState({ showOptions: value }, this.setFocus);
  updateUserInfo = userInfo => this.setState(userInfo);

  handleQueryChange = (e) => {
    const query = e.target.value;
    this.setState(({ showOptions, component }) => ({
      query,
      ...(!showOptions && !component && { showOptions: true }),
    }));
  };

  toggleLocationDropdown = () => {
    this.setState(({ showLocations }) => ({
      showLocations: !showLocations,
    }));
  };

  handleLocationChange = async (locationId) => {
    this.setState({
      showLocations: false,
    });
    await changeUserLocation(locationId);
    this.props.changeUserLocation();
  };

  render() {
    const { firstName, lastName, picture } = this.state;

    return (
      <div className="top-menu">
        <div className="container size-2-8 nav-menu">
          <div className="container content-start nav-left">
            <ul className="inline nav-brand">
              <li className="logo">
                <img src={convergeLogoIcon} alt="Logo" />
              </li>
              <li className="logo-text" />
            </ul>
          </div>
          <div className="container content-end nav-right">
            <div className="container side-nav">
              <div className="notifications">
                <img src={notificationsIcon} alt="Notification icon" />
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

TopMenuComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  changeUserLocation: PropTypes.func,
};

TopMenuComponent.defaultProps = {
  changeUserLocation: () => {},
};

export default withRouter(TopMenuComponent);
