import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Link from 'react-toolbox/lib/link';

/**
 * Handles redirections upon click
 * of any component on the NavLink
 *
 * @param {object} event
 * @param {object} history
 * @param {object} to
 *
 * @returns {JSX}
 */
export const handleClick = (event, history, to) => {
  event.preventDefault();

  history.push(typeof to === 'object' ? to.pathname : to);
};

const NavLink = ({
  to, exact, strict, ...rest
}) => (
  <Route
    path={to}
    exact={exact}
    strict={strict}
    children={({ history, match }) => (
      <Link
        {...rest}
        active={!!match}
        onClick={event => handleClick(event, history, to)}
      />
    )}
  />
);

NavLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    PropTypes.string,
  ]).isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
  strict: false,
};

export default NavLink;
