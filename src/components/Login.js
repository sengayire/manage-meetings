import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-toolbox';
import { withRouter } from 'react-router-dom';

import ROUTES from '../utils/routes';
import '../assets/styles/login.scss';
import darkTabletImage from '../assets/images/DarkTablet.png';
import LoginButton from './login/LoginButton';
import MRMIntro from './login/MRMIntro';
import { decodeTokenAndGetUserData, getToken } from '../utils/Cookie';
import Constants from '../utils/Constants';
import {
  parseQueryString,
  getItemFromLocalStorage,
  saveItemInLocalStorage,
} from '../utils/Utilities';

// destructor constants to be used
const {
  MRM_TOKEN,
  MESSAGES: { defaultLoginError },
} = Constants;
/**
 * The login component. Currently only implements the Login  User Interface
 * Login functionality to be Added Later
 * @author [Dennis Jjagwe](https://github.com/dennisja)
 */
export class Login extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      state: PropTypes.object,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getDerivedStateFromProps = (props) => {
    const { push } = props.history;
    const token = getItemFromLocalStorage(MRM_TOKEN);
    // this logic has been placed in this lifecycle method to avoid rendering of
    // the login page UI if a user is already loggedin
    // if user is logged in
    if (token) {
      // redirect user to settings page
      push(ROUTES.settings);
    }
    // returning null since no state updates
    return null;
  };

  state = {
    loginError: null,
  };

  componentDidMount = () => {
    const { push } = this.props.history;

    // apply body styles
    this.applyBodyStyles();

    // parse cookie to see if a user has been succesfully logged in by the Andela login api
    const tokenFromCookies = getToken();
    // decode token to get user data
    const data = decodeTokenAndGetUserData();
    if (data && 'UserInfo' in data) {
      // save token to local storage
      saveItemInLocalStorage(MRM_TOKEN, tokenFromCookies);
      // redirect user to settings page
      push(ROUTES.settings);
      return; // avoid execution of error handling if no errors occur
    }

    // handle login errors from the Andela API if they occur
    const { search = '', state: locationState } = this.props.location;
    const queryParameters = parseQueryString(search) || {};
    if ('error' in queryParameters) {
      this.handleLoginError();
    }
    // handle errors that occur when a user tries to access a protected page
    if (locationState && 'errorMessage' in locationState) {
      this.handleLoginError(locationState.errorMessage);
    }
  };

  componentWillUnmount() {
    // remove home-bg class when unmounting this component to another component
    document.body.classList.remove('home-bg');
  }

  // Apply body styles on homepage only
  applyBodyStyles = () => {
    const { location } = this.props;
    location.pathname === ROUTES.home && document.body.classList.add('home-bg');
  };

  handleLoginError = (loginError = defaultLoginError) => {
    this.setState({ loginError });
  };

  handleSnackBarClose = () => {
    this.setState({ loginError: null });
    this.props.history.push(ROUTES.home);
  };

  render() {
    const { loginError } = this.state;
    return (
      <Fragment>
        <header className="home-header">
          <h1>CONVERGE</h1>
        </header>
        <MRMIntro />
        <LoginButton />

        <img src={darkTabletImage} alt="Dark Tablet" id="dark-tablet" />

        {/* display login errors */}
        {loginError && (
          <Snackbar
            type="cancel"
            action="Dismiss"
            label={loginError}
            timeout={Constants.ERROR_TIMEOUT}
            active={Boolean(loginError)}
            onTimeout={this.handleSnackBarClose}
            onClick={this.handleSnackBarClose}
            theme={{ snackbar: 'error', button: 'button-error' }}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(Login);
