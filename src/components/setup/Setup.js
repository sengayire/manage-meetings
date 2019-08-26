import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WelcomePage from './WelcomePage';
import SetupInfoPage from './SetupInfoPage';
import BuildingLevel from './BuildingLevel';
import RoomSetupView from '../../containers/RoomSetupView';
import { getRoomsStructure, getUserDetails, getUserRole } from '../helpers/QueriesHelpers';
import Spinner from '../commons/Spinner';
import '../../assets/styles/setupWelcomePage.scss';
import '../../assets/styles/setupInfoPage.scss';
import ErrorIcon from '../commons/ErrorIcon';

class Setup extends Component {
  state = {
    visibleLevel: 'WelcomePage',
    location: '',
    isStructureSetup: false,
    loaded: false,
    user: '',
  };

  componentDidMount() {
    this.getUsersInformation();
    this.getStructures();
  }

  /**
   * It queries the Apollo store to fetch user details
   * @returns {Object}
   */
  getUsersInformation = async () => {
    const user = await getUserDetails();
    this.setState({ user });
  };


  getOfficeStructure = async () => {
    const data = await getRoomsStructure();
    return data;
  };
  /**
   * Gets the structures setup
   *
   * @returns {void}
   */
  getStructures = async () => {
    const data = await this.getOfficeStructure();
    const { allStructures } = data;
    allStructures.length && this.setState({ isStructureSetup: true });
    this.setState({ loaded: true });
  }

  getAllStructureIds = async () => {
    const officeStructure = await this.getOfficeStructure();
    const structureIds = [];
    officeStructure.allStructures.map(allStructure =>
      structureIds.push(allStructure.structureId),
    );
    return structureIds;
  };

  /**
   * Checks whether the parameter matches the state and switches it if not.
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
   * Conditionally renders the content
   * of the setup page
   *
   * @param level
   * @param client
   *
   * @return {JSX}
   */
  renderSetupContent = (level) => {
    const {
      location, isStructureSetup, loaded, user,
    } = this.state;

    const { searchState } = this.props;

    if (loaded) {
      switch (level) {
        case 'SetupInfoPage':
          return (<SetupInfoPage
            handleClick={this.handleClick}
            userLocationChanged={this.props.userLocationChanged}
          />);
        case 'BuildingLevel':
          return (<BuildingLevel
            handleClick={this.handleClick}
            getAllStructureIds={this.getAllStructureIds}
            userLocationChanged={this.props.userLocationChanged}
          />);
        case 'RoomSetupView':
          return (
            <RoomSetupView
              searchState={searchState}
              handleClick={this.handleClick}
              userLocation={location}
              userLocationChanged={this.props.userLocationChanged}
            />
          );
        default:
          return (!isStructureSetup
            ? <WelcomePage user={user} handleClick={this.handleClick} />
            :
            <RoomSetupView
              handleClick={this.handleClick}
              userLocation={location}
              searchState={searchState}
              userLocationChanged={this.props.userLocationChanged}
            />);
      }
    }
    return (
      <div className="setup_container">
        <div className="setup__spinner">
          <Spinner />
        </div>
      </div>);
  };

  render() {
    const { visibleLevel } = this.state;
    return (
      <div>
        {getUserRole().includes('Admin') ? (
          this.renderSetupContent(visibleLevel)
        ) : (
          <div className="item-list-empty"> <ErrorIcon message="You are not authorized to perform this action" /> </div>)}
      </div>
    );
  }
}

Setup.propTypes = {
  userLocationChanged: PropTypes.bool,
  searchState: PropTypes.shape({
    component: PropTypes.string,
    query: PropTypes.string,
  }),
};

Setup.defaultProps = {
  userLocationChanged: PropTypes.bool,
  searchState: undefined,
};

export default Setup;
