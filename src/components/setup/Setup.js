import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WelcomePage from './WelcomePage';
import SetupInfoPage from './SetupInfoPage';
import BuildingLevel from './BuildingLevel';
import RoomSetupView from '../../containers/RoomSetupView';
import '../../assets/styles/setupWelcomePage.scss';
import '../../assets/styles/setupInfoPage.scss';

class Setup extends Component {
  state = {
    isSetupInfoVisible: false,
    isBuildingLevelVisible: false,
    isRoomSetupViewVisible: false,
  };

  handleClick = e => () =>
    // eslint-disable-next-line no-unused-expressions
    (e === 'isSetupInfoVisible'
      ? this.setState({
        isSetupInfoVisible: true,
        isBuildingLevelVisible: false,
        isRoomSetupViewVisible: false,
      })
      : e === 'isBuildingLevelVisible'
        ? this.setState({
          isSetupInfoVisible: false,
          isBuildingLevelVisible: true,
          isRoomSetupViewVisible: false,
        })
        : this.setState({
          isSetupInfoVisible: false,
          isBuildingLevelVisible: false,
          isRoomSetupViewVisible: true,
        }));

  render() {
    const { client } = this.props;
    const { isSetupInfoVisible, isBuildingLevelVisible, isRoomSetupViewVisible } = this.state;
    return isSetupInfoVisible ? (
      <SetupInfoPage handleClick={this.handleClick} />
    ) : isBuildingLevelVisible ? (
      <BuildingLevel handleClick={this.handleClick} client={client} />
    ) : isRoomSetupViewVisible ? (
      <RoomSetupView handleClick={this.handleClick} />
    ) : (
      <WelcomePage handleClick={this.handleClick} client={client} />
    );
  }
}

Setup.propTypes = {
  client: PropTypes.shape({}),
};
Setup.defaultProps = {
  client: {},
};

export default Setup;
