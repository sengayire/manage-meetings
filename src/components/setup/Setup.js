import React, { Component } from 'react';
import WelcomePage from './WelcomePage';
import BuildingLevel from './BuildingLevel';

class Setup extends Component {
  state = {
    isBuildingLevelVisible: false,
  };

  handleClick = () => {
    this.setState({
      isBuildingLevelVisible: true,
    });
  };

  render() {
    return this.state.isBuildingLevelVisible ? (
      <BuildingLevel />
    ) : (
      <WelcomePage handleClick={this.handleClick} />
    );
  }
}

export default Setup;
