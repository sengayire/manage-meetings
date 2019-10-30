/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OfficeStructure from '../components/onboarding/officeStructure/officeStructure';

class OnboardingPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePage: props.centerSetupLevel,
    };
  }

  renderOnboardingPages = (centerSetupLevel) => {
    switch (centerSetupLevel) {
      case 'setupLocation':
        return <h1>setupLocation</h1>;
      case 'officeStructure':
        return <OfficeStructure />;
      case 'addRooms':
        return <h1>addRooms</h1>;
      case 'addResources':
        return <h1>addResources</h1>;
      default:
        return (
          <h1>
            centerIsSetup
          </h1>
        );
    }
  };
  render() {
    const { visiblePage } = this.state;
    return <Fragment>{this.renderOnboardingPages(visiblePage)}</Fragment>;
  }
}

OnboardingPages.propTypes = {
  centerSetupLevel: PropTypes.any.isRequired,
};

export default OnboardingPages;
