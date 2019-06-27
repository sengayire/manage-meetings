import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { convergeLogoIcon, notificationsIcon, searchIcon } from '../../utils/images/images';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import '../../assets/styles/topmenu.scss';
import { Input } from '../commons';

/**
 * Component for Top Menu
 *
 * @extends React.Component
 *
 * @returns {JSX}
 *
 */
class TopMenu extends React.Component {
  state = {
    query: '',
    showOptions: false,
  }

  componentDidMount() {
    const userInfo = this.getUserInfoFromToken();

    this.updateUserInfo(userInfo);
  }

  componentDidUpdate(prevProps, { query, showOptions, ...prevUserInfo }) {
    const currentUserInfo = this.getUserInfoFromToken();

    const stringify = data => JSON.stringify(data);

    if (stringify(prevUserInfo) !== stringify(currentUserInfo)) {
      this.updateUserInfo(currentUserInfo);
    }
  }

  getUserInfoFromToken = () => {
    const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
    const { first_name: firstName, last_name: lastName, picture } =
      userData || {};
    return { firstName, lastName, picture };
  }

  getLinks = component => (
    <Link
      to={{
        pathname: '/setup',
        state: {
          component,
          query: this.state.query,
        },
      }}
      href="/setup"
    >
      &nbsp;
    </Link>
  );


  addListener = () => {
    this.setState({ showOptions: true });
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = ({ target }) => {
    if (this.globalSearch && this.globalSearch.contains(target)) return;

    this.setState({ showOptions: false }, () => {
      document.removeEventListener('click', this.handleOutsideClick);
    });
  }

  toggleOptions = value => this.setState({ showOptions: value });

  updateUserInfo = userInfo => this.setState(userInfo);

  handleQueryChange = (e) => {
    const query = e.target.value;
    this.setState(({ showOptions }) => ({
      query,
      ...(!showOptions && { showOptions: true }),
    }));
  };

  render() {
    const {
      query, firstName, lastName, picture, showOptions,
    } = this.state;


    return (
      <div className="top-menu">
        <div className="container size-2-8 nav-menu">
          <div className="container content-start nav-left">
            <ul className="inline nav-brand">
              <li className="logo">
                <img src={convergeLogoIcon} alt="Logo" />
              </li>
              <li className="logo-text">
                <h1>CONVERGE</h1>
              </li>
            </ul>
          </div>
          <div className="container content-end nav-right">
            <div className="search-box">
              <div className="container input-container" ref={(node) => { this.globalSearch = node; }}>
                <div className={`search-box__input-field${!showOptions ? ' adjust-for-options' : ''}`}>
                  <Input
                    id="amenity"
                    name="amenity"
                    placeholder=""
                    labelName=" "
                    labelClass="add-resource-controls"
                    value={query}
                    onChange={this.handleQueryChange}
                    onFocus={this.addListener}
                  />
                  <img
                    className="search-icon"
                    src={searchIcon}
                    alt="Search icon"
                  />
                </div>
                {showOptions && (
                  <Fragment>
                    <div className="search-link-options__shape">
                      {this.getLinks('rooms')}
                      {this.getLinks('resources')}
                      {this.getLinks('people')}
                    </div>
                    <div className="search-link-options">
                      <div
                        className="search-link-options__option"
                      >
                      Rooms
                      </div>
                      <div
                        className="search-link-options__option"
                      >
                        Resources
                      </div>
                      <div
                        className="search-link-options__option"
                      >
                      People
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
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

export default TopMenu;
