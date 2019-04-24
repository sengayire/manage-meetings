import React, { Component } from 'react';
import WelcomePage from './WelcomePage';
import SetupInfoPage from './SetupInfoPage';
import BuildingLevel from './BuildingLevel';
import RoomSetupView from '../../containers/RoomSetupView';
import { getRoomsStructure } from '../helpers/QueriesHelpers';
import '../../assets/styles/setupWelcomePage.scss';
import '../../assets/styles/setupInfoPage.scss';

class Setup extends Component {
  state = {
    visibleLevel: 'WelcomePage',
    location: '',
    isStructureSetup: false,
  };

  componentDidMount() {
    this.getStructures();
  }

  /**
   * Gets the strcutures setup
   *
   * @returns {void}
   */
  getStructures = async () => {
    const data = await getRoomsStructure();
    const { allStructures } = data;
    allStructures.length && this.setState({ isStructureSetup: true });
  }

  /**
   * Checks whether the parameter matches the state and switches it if not.
   *
   * @param event
   * @return {boolean}
   */
  handleClick = event => () => {
    switch (event) {
      case 'SetupInfoPage':
        this.setState({
          visibleLevel: 'SetupInfoPage',
        });
        break;
      case 'BuildingLevel':
        this.setState({
          visibleLevel: 'BuildingLevel',
        });
        break;
      case 'RoomSetupView':
        this.setState({
          visibleLevel: 'RoomSetupView',
        });
        break;
      default:
        this.setState({
          visibleLevel: 'WelcomePage',
        });
    }
  };

  /**
   * `Conditionally renders the content
   * of the setup page
   *
   * @param level
   * @param client
   *
   * @return {JSX}
   */
  renderSetupContent = (level) => {
    const { location, isStructureSetup } = this.state;

    switch (level) {
      case 'SetupInfoPage':
        return <SetupInfoPage handleClick={this.handleClick} />;
      case 'BuildingLevel':
        return <BuildingLevel handleClick={this.handleClick} />;
      case 'RoomSetupView':
        return (<RoomSetupView handleClick={this.handleClick} userLocation={location} />);
      default:
        return (!isStructureSetup
          ? <WelcomePage handleClick={this.handleClick} />
          : <RoomSetupView handleClick={this.handleClick} userLocation={location} />);
    }
  };

  render() {
    const { visibleLevel } = this.state;
    return this.renderSetupContent(visibleLevel);
  }
}

export default Setup;
