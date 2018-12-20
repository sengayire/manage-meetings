import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/backArrow.scss';

const BackArrow = ({ redirectUri }) => (
  <NavLink to={redirectUri} className="arrow">
    <span className="arrow-symbol">
      &#11013;
    </span>
    <span>Back</span>
  </NavLink>
);

BackArrow.propTypes = {
  redirectUri: PropTypes.string.isRequired,
};

export default BackArrow;
