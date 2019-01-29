import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/sidebar.scss';

/**
 * Menu Title component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const MenuTitle = props => (
  <span className="menu-title">{props.title.toUpperCase()}</span>
);

MenuTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default MenuTitle;