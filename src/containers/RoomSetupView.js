import React, { Component } from 'react';
import RoomSetup from './RoomSetup';
import Resources from '../components/setup/resources/Resources';
import SetupNavbar from '../components/setup/SetupNavbar';

/* Styles */
import '../assets/styles/roomSetup.scss';

class RoomSetupOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavItem: 'meeting-rooms',
    };
  }

  handleSelectedItem = (event) => {
    const { id } = event.currentTarget;
    this.setState({ currentNavItem: id });
  };

  render() {
    const { currentNavItem } = this.state;
    return (
      <div className="setup-main-container">
        <SetupNavbar currentNavItem={currentNavItem} handleSelectedItem={this.handleSelectedItem} />
        {currentNavItem === 'resources' ? <Resources /> : <RoomSetup />}
      </div>
    );
  }
}

export default RoomSetupOverView;
