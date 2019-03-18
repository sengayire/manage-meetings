import React, { Component } from 'react';
import WelcomePage from './WelcomePage';
import BuildingLevel from './BuildingLevel';
import RoomSetupView from '../../containers/RoomSetupView';

class Setup extends Component {
  state = {
    isBuildingLevelVisible: false,
    isActive: false,
  };

  handleClick = () => {
    this.setState({
      isBuildingLevelVisible: true,
    });
  };
  handleClickBuilding = () => {
    this.setState({
      isActive: true,
    });
  };
  render() {
    const { isActive } = this.state;
    return this.state.isBuildingLevelVisible ? (
      !isActive ? (<BuildingLevel handleClickBuilding={this.handleClickBuilding} />)
        : (<RoomSetupView />)
    ) : (
      <WelcomePage handleClick={this.handleClick} />
    );
  }
}

export default Setup;
