/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import navBarItems from '../../fixtures/setupNavBarData';

/**
 * Builds component for setup navigation
 *
 * @extends Component
 *
 * @returns {JSX}
 */
const SetupNavbar = (props) => {
  const currentNavItem = props.currentNavItem === 'rooms' ? 'meeting-rooms' : props.currentNavItem;
  const { handleSelectedItem } = props;

  const navBarItemToDisplay = navBarItems.map(navItem => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      key={navItem.id}
      onClick={handleSelectedItem}
      id={navItem.id}
      className={`setup-nav-item ${currentNavItem === navItem.id ? 'active-nav-item' : ''}`}
    >
      <img className="setup-nav-icon" src={navItem.src} alt={navItem.alt} />
      &nbsp;
      {navItem.text}
    </div>
  ));
  return <div className="setup-navbar">{navBarItemToDisplay}</div>;
};

SetupNavbar.propTypes = {
  handleSelectedItem: PropTypes.func.isRequired,
  currentNavItem: PropTypes.string.isRequired,
};

export default SetupNavbar;
