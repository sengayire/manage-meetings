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
  getRoomsStructure,
  getRoomList,
  getUserLocation,
} from '../components/helpers/QueriesHelpers';

/* Styles */
import '../assets/styles/roomSetup.scss';
import StructurePreviewTree from '../components/setup/StructurePreviewTree';
import { orderByLevel } from '../utils/formatSetupData';
import stripTypenames from '../components/helpers/StripTypeNames';
import { meetingRoomTabMockData } from '../utils/roomSetupMock';
import filterRooms from '../utils/filterRoomsData';

class RoomSetupOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRooms: { rooms: meetingRoomTabMockData },
      currentNavItem: 'structure',
      locationId: getUserLocation().id,
      previewDataFromBackend: [],
      location: getUserLocation().name,
    };
  }

  componentDidMount() {
    this.setPreviewData();
    if (this.props.searchState) this.setLocationState();
  }

  componentDidUpdate(prevProps) {
    const { searchState: { component: oldComponent } = {} } = prevProps;
    const { component } = this.props.searchState || {};
    if (component && (component !== oldComponent)) {
      sessionStorage.setItem('setupCurrentNav', component);
      this.setLocationState();
    }

    if (prevProps.userLocationChanged !== this.props.userLocationChanged) {
      this.setLocation();
      this.getRooms();
      setTimeout(() => { this.setPreviewData(); }, 1000);
    }
  }

  setLocationState() {
    const { component: currentNavItem } = this.props.searchState;
    this.setState({ currentNavItem });
  }

  setLocation() {
    this.setState({
      location: getUserLocation().name,
      locationId: getUserLocation().id,
    });
  }

  getStoredNav = () => sessionStorage.getItem('setupCurrentNav')

  /**
   * get the logged in user's location id and update the state with the id
   *
   *  @returns {void}
   */
  setPreviewData = async () => {
    const allTheStructures = await getRoomsStructure();
    const { allStructures } = allTheStructures;
    const formattedData = orderByLevel(stripTypenames(allStructures));
    this.setState({
      previewDataFromBackend: formattedData,
    });
  }

  getRooms = async (args = [this.state.location, 8, 1, '']) => {
    let { allRooms } = await getRoomList(...args);
    allRooms = filterRooms(allRooms, args[3]);
    this.setState({ allRooms });
  }

  updateStructure = (data) => {
    this.setState({
      previewDataFromBackend: data,
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
    sessionStorage.setItem('setupCurrentNav', id);
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
        <DevicesList
          getRooms={this.getRooms}
          location={{ name, id }}
          userLocationChanged={this.props.userLocationChanged}
        />
      </div>
    );
  };

  renderNavItems = () => {
    const {
      props: { handleClick, searchState: { component, query } = {} },
      state: {
        allRooms,
        currentNavItem,
        previewDataFromBackend,
        locationId,
        location,
      },
    } = this;
    const navItem = this.getStoredNav() || currentNavItem;
    switch (component || navItem) {
      case 'resources':
        return <Resources location={location} getRooms={this.getRooms} query={query} />;
      /* istanbul ignore next */
      case 'people':
        return <PeopleList locationId={locationId} location={location} query={query} />;
      case 'devices':
        return this.renderDeviceList();
      case 'structure':
        return (<StructurePreviewTree
          data={previewDataFromBackend}
          handleClick={handleClick}
          updateStructure={this.updateStructure}
        />);
      default:
        return (<RoomSetup
          getRooms={this.getRooms}
          userLocationChanged={this.props.userLocationChanged}
          allRooms={allRooms}
          query={query}
        />);
    }
  };

  render() {
    const { currentNavItem } = this.state;
    const { component } = this.props.searchState || {};
    return (
      <div className="setup-main-container">
        <SetupNavbar
          currentNavItem={component || this.getStoredNav() || currentNavItem || 'structure'}
          handleSelectedItem={this.handleSelectedItem}
        />
        {this.renderNavItems()}
      </div>
    );
  }
}

RoomSetupOverView.propTypes = {
  userLocationChanged: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  searchState: PropTypes.shape({
    component: PropTypes.string,
    query: PropTypes.string,
  }),
};

RoomSetupOverView.defaultProps = {
  userLocationChanged: PropTypes.bool,
  searchState: undefined,
};

export default RoomSetupOverView;
