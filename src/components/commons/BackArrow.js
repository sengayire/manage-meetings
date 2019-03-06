import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/backArrow.scss';

/**
 * Reusable component for a back arrow
 *
 * @param {object} redirectUri
 *
 * @returns {JSX}
 */

/* eslint-disable jsx-a11y/accessible-emoji */
const BackArrow = ({ redirectUri }) => (
  <NavLink to={redirectUri} className="arrow">
    <span className="arrow-symbol">&#11013;</span>
    <span>Back</span>
  </NavLink>
);

BackArrow.propTypes = {
  redirectUri: PropTypes.string.isRequired,
};

export default BackArrow;
