/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbars/TopMenu';
import OnboardingImage from '../../assets/images/onboardingImage.svg';
import '../../assets/styles/welcomePage.scss';

/**
 * Onboarding Welcome Page
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */

class WelcomePage extends Component {
  state = {
    default: true,
  }
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="main-page" id="main-page">
          <div className="title-message-blocks">
            <p className="title-message">
                Awesome!
            </p>

          </div>
          <div className="welcome-card">
            <div className="onboarding-image-block">
              <img
                src={OnboardingImage}
                alt="Onboarding"
                className="onboarding-image"
              />
            </div>
            <div className="welcome-message">
              <p>
                You’re doing great already. Next we’ll setup your Andela center
                & the meeting <br /> rooms within each building.
              </p>
            </div>
            <div className="welcome-botton">
              <Link
                id="welcome-botton-link"
                to="/onboarding/setup/buildings"
                className="link"
              >
                Let’s Go!
              </Link>
            </div>

          </div>
        </div>
      </Fragment>

    );
  }
}

export default WelcomePage;
