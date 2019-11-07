/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OfficeStructure from '../components/onboarding/officeStructure/officeStructure';
import WelcomePage from '../components/onboarding/WelcomePage';
import NavBar from '../components/navbars/TopMenu';
import BuildingsSetup from '../components/onboarding/BuildingsSetup/index';
import AddRooms from '../components/onboarding/addRooms/index';
import { AddResources } from '../components/onboarding/addResources';
import Container from '../containers/mainContainer';

class OnboardingPages extends Component {
  state = {
    visiblePage: this.props.centerSetupLevel,
    page: 0,
  };

  handleOnClick = (page) => {
    this.setState({ visiblePage: page });
  }

  renderOnboardingPages = (centerSetupLevel) => {
    switch (centerSetupLevel) {
      case 'welcomePage':
        return <WelcomePage handleOnClick={this.handleOnClick} />;
      case 'buildingsSetup':
        return <BuildingsSetup handleOnClick={this.handleOnClick} />;
      case 'officeStructure':
        return <OfficeStructure handleOnClick={this.handleOnClick} />;
      case 'addRooms':
        return <AddRooms handleOnClick={this.handleOnClick} />;
      case 'addResources':
        return <AddResources handleOnClick={this.handleOnClick} />;
      default:
        return (
          this.setState({ page: 1 })
        );
    }
  };
  render() {
    const { visiblePage, page } = this.state;
    return !page ? (
      <Fragment>
        <NavBar />
        <div>
          {this.renderOnboardingPages(visiblePage)}
        </div>

      </Fragment>
    ) : (<Container />);
  }
}

OnboardingPages.propTypes = {
  centerSetupLevel: PropTypes.any.isRequired,
};

export default OnboardingPages;
