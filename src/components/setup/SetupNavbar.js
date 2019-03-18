/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import navBarItems from '../../fixtures/setupNavBarData';

/**
 * Builds component for setup navigation
 *
 * @extends Component
 *
 * @returns {JSX}
 */
class SetupNavbar extends Component {
  state = {
    currentNavItem: 'meeting-rooms',
  };

  /**
   * It updates the state
   *
   * @param {Object} event
   *
   * @returns {void}
   */
  handleSelectedItem = (event) => {
    const { id } = event.currentTarget;
    this.setState({ currentNavItem: id });
  };

  render() {
    const { currentNavItem } = this.state;
    const navBarItemToDisplay = navBarItems.map(navItem => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        key={navItem.id}
        onClick={this.handleSelectedItem}
        id={navItem.id}
        className={`setup-nav-item ${
          currentNavItem === navItem.id ? 'active-nav-item' : ''
        }`}
      >
        <img className="setup-nav-icon" src={navItem.src} alt={navItem.alt} />
        &nbsp;
        {navItem.text}
      </div>
    ));
    return <div className="setup-navbar">{navBarItemToDisplay}</div>;
  }
}

export default SetupNavbar;
