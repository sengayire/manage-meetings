import React, { Component } from 'react';
import RoomSetup from './RoomSetup';
import Resources from '../components/setup/resources/Resources';
import SetupNavbar from '../components/setup/SetupNavbar';
// eslint-disable-next-line import/no-named-as-default
import PeopleList from '../components/people/PeopleList';

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

  renderNavItems = () => {
    const { currentNavItem } = this.state;
    switch (currentNavItem) {
      case 'resources':
        return <Resources />;
      /* istanbul ignore next */
      case 'people':
        return <PeopleList />;
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
