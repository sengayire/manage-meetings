import React, { Component } from 'react';
// eslint-disable-next-line import/no-named-as-default
import RoomSetup from '../components/rooms/RoomSetup';
import Resources from '../components/setup/resources/Resources';
import DevicesList from '../components/devices/DeviceList';
import SetupNavbar from '../components/setup/SetupNavbar';
// eslint-disable-next-line import/no-named-as-default
import PeopleList from '../components/people/PeopleList';
import SelectInput from '../components/commons/SelectInput';
import { selectMockData } from '../utils/roomSetupMock';
import {
  getUserDetails,
  getAllLocations,
} from '../components/helpers/QueriesHelpers';

/* Styles */
import '../assets/styles/roomSetup.scss';
import StructurePreviewTree from '../components/setup/StructurePreviewTree';
import { previewData } from '../fixtures/previewModal';

class RoomSetupOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavItem: 'meeting-rooms',
      locationId: '',
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
    const userLocation = allLocations.find(location => location.name === user.location);
    const userLocationId = userLocation.id;
    this.setState({
      locationId: userLocationId,
    });
  }

  handleInputChange = () => {};

  /**
   * It handles creating of select input
   *
   * @returns {jsx}
   */
  createSelectInputs = () => {
    const selectInputs =
      selectMockData &&
      selectMockData.map(({
        name, id, value, placeholder,
      }) => (
        <div key={id} className="room-select-sub">
          <SelectInput
            labelText=""
            wrapperClassName="setup-select-input-wrapper"
            name={name}
            id={id}
            value={value}
            onChange={this.handleInputChange}
            selectInputClassName="setup-select-input"
            placeholder={placeholder}
            options={null}
          />
        </div>
      ));
    return selectInputs;
  };

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
  renderDeviceList = () => (
    <div className="setup-container">
      <div className="room-setup-header">
        <p>EPIC Tower&apos;s Devices</p>
      </div>
      <div className="room-select-input">{this.createSelectInputs()}</div>
      <DevicesList />
    </div>
  );

  renderNavItems = () => {
    const { currentNavItem, locationId } = this.state;
    switch (currentNavItem) {
      case 'resources':
        return <Resources />;
      /* istanbul ignore next */
      case 'people':
        return <PeopleList locationId={locationId} />;
      case 'devices':
        return this.renderDeviceList();
      case 'structure':
        return <StructurePreviewTree data={previewData} />;
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

export default RoomSetupOverView;
