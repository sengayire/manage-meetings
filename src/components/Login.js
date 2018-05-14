import React, { Component, Fragment } from 'react';
import '../assets/styles/login.scss';
import darkTabletImage from '../assets/images/DarkTablet.png';
import loginButton from '../assets/images/Button.png';

/**
 * The login component. Currently only implements the Login  User Interface
 * Login functionality to be Added Later
 * @author [Dennis Jjagwe](https://github.com/dennisja)
 */

export default class Login extends Component {
  /**
   * Logs in a user
   */
  loginUser = () => {
    // login logic here
  };

  render() {
    return (
      <Fragment>
        <div>
          <header>
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
