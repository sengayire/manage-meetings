/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OnboardingImage from '../../assets/images/onboardingImage.svg';
import '../../assets/styles/welcomePage.scss';

/**
 * Onboarding Welcome Page
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */

const WelcomePage = ({ handleOnClick }) => (
  <Fragment>
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
        <div
          id="welcome-botton"
          className="welcome-botton"
          onClick={() => handleOnClick('buildingsSetup')}
        >
          <div
            id="welcome-botton-link"
            className="link"
          >
            Let’s Go!
          </div>
        </div>

      </div>
    </div>
  </Fragment>
);

WelcomePage.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default WelcomePage;
