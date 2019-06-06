import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-named-as-default
import RoomSetup from '../components/rooms/RoomSetup';
import Resources from '../components/setup/resources/Resources';
import DevicesList from '../components/devices/DeviceList';
import SetupNavbar from '../components/setup/SetupNavbar';
// eslint-disable-next-line import/no-named-as-default
import PeopleList from '../components/people/PeopleList';
import {
  getUserDetails,
  getAllLocations,
  getRoomsStructure,
} from '../components/helpers/QueriesHelpers';

/* Styles */
import '../assets/styles/roomSetup.scss';
import StructurePreviewTree from '../components/setup/StructurePreviewTree';
import { orderByLevel } from '../utils/formatSetupData';
import stripTypenames from '../components/helpers/StripTypeNames';

class RoomSetupOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavItem: 'meeting-rooms',
      locationId: '',
      previewDataFromBackend: [],
      location: '',
    };
  }

  componentDidMount() {
    this.setUserLocation();
  }

  /**
   * get the logged in user's location id and update the state with the id
   *
   *  @returns {void}
   */
  setUserLocation = async () => {
    const user = await getUserDetails();
    const allLocations = await getAllLocations();
    const allTheStructures = await getRoomsStructure();
    const { allStructures } = allTheStructures;
    const userLocation = allLocations.find(location => location.name === user.location);
    const formattedData = orderByLevel(stripTypenames(allStructures));
    this.setState({
      previewDataFromBackend: formattedData,
      locationId: userLocation.id,
      location: user.location,
    });
  }

  handleInputChange = () => { };


  /**
   * It handles  item selected fucntion
   *
   * @returns {void}
   */
  handleSelectedItem = (event) => {
    const { id } = event.currentTarget;
    this.setState({ currentNavItem: id });
  };

  /**
   * It renders devicelist
   *
   * @returns {jsx}
   */
  renderDeviceList = () => {
    const { location: name, locationId: id } = this.state;
    return (
      <div className="setup-container">
        <div className="room-setup-header">
          <p>{this.state.location}&apos;s Devices</p>
        </div>
        {/* Add filters in line below. */}
        <div className="room-select-input" />
        <DevicesList location={{ name, id }} />
      </div>
    );
  };

  renderNavItems = () => {
    const {
      props: { handleClick },
      state: {
        currentNavItem,
        previewDataFromBackend,
        locationId,
        location,
      },
    } = this;
    switch (currentNavItem) {
      case 'resources':
        return <Resources location={location} />;
      /* istanbul ignore next */
      case 'people':
        return <PeopleList locationId={locationId} location={location} />;
      case 'devices':
        return this.renderDeviceList();
      case 'structure':
        return <StructurePreviewTree data={previewDataFromBackend} handleClick={handleClick} />;
      default:
        return <RoomSetup />;
    }
  };

  render() {
    const { currentNavItem } = this.state;
    return (
      <div className="setup-main-container">
        <SetupNavbar currentNavItem={currentNavItem} handleSelectedItem={this.handleSelectedItem} />
        {this.renderNavItems()}
      </div>
    );
  }
}

RoomSetupOverView.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default RoomSetupOverView;
