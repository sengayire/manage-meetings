import React, { Component } from 'react';
import WelcomePage from './WelcomePage';
import SetupInfoPage from './SetupInfoPage';
import BuildingLevel from './BuildingLevel';
import RoomSetupView from '../../containers/RoomSetupView';
import { getUserDetails, getRoomList } from '../helpers/QueriesHelpers';
import '../../assets/styles/setupWelcomePage.scss';
import '../../assets/styles/setupInfoPage.scss';

class Setup extends Component {
  state = {
    visibleLevel: 'WelcomePage',
    centerRoomCount: 1,
  };

  componentDidMount() {
    this.getRoomCount();
  }

  /**
   * Gets the number of rooms for a center and
   * updates value of centerRoomCount in state
   *
   * @return {void}
   */
  getRoomCount = async () => {
    const user = await getUserDetails();
    const rooms = await getRoomList(user.location, 8, 1);

    this.setState({ centerRoomCount: rooms.allRooms.rooms.length });
  };

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
    const { centerRoomCount } = this.state;
    switch (level) {
      case 'SetupInfoPage':
        return <SetupInfoPage handleClick={this.handleClick} />;
      case 'BuildingLevel':
        return <BuildingLevel handleClick={this.handleClick} />;
      case 'RoomSetupView':
        return <RoomSetupView handleClick={this.handleClick} />;
      default:
        return centerRoomCount < 100 ? (
          <WelcomePage handleClick={this.handleClick} />
        ) : (
          <RoomSetupView handleClick={this.handleClick} />
        );
    }
  };

  render() {
    const { visibleLevel } = this.state;
    return this.renderSetupContent(visibleLevel);
  }
}

export default Setup;
