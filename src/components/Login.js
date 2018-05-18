import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ROUTES from '../utils/routes';
import '../assets/styles/login.scss';
import darkTabletImage from '../assets/images/DarkTablet.png';
import loginButton from '../assets/images/Button.png';

/**
 * The login component. Currently only implements the Login  User Interface
 * Login functionality to be Added Later
 * @author [Dennis Jjagwe](https://github.com/dennisja)
 */

class Login extends Component {
  static propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  };
  componentDidMount() {
    this.applyBodyStyles();
  }
  /**
   * Logs in a user
   */
  loginUser = () => {
    // login logic here
  };
  // Apply body styles on homepage only
  applyBodyStyles = () => {
    const { location } = this.props;
    location.pathname === ROUTES.home && document.body.classList.add('home-bg');
  };

  render() {
    return (
      <Fragment>
        <div>
          <header className="home-header">
            <h1>CONVERGE</h1>
          </header>

          <div id="converge-intro">
            Meet the Meeting Room App
            <br />
            that your meeting room app aspires to be.
          </div>

          <input
            type="image"
            src={loginButton}
            alt="Login With Your Email"
            className="btn-signin"
            onClick={this.loginUser}
          />
        </div>

        <img src={darkTabletImage} alt="Dark Tablet" id="dark-tablet" />
      </Fragment>
    );
  }
}

export default withRouter(Login);
