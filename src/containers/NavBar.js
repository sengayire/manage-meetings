import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TopNav from '../components/navbars/TopNav';
import TopMenu from '../components/navbars/TopMenu';

const NavBar = ({ route }) => (
  <Fragment>
    <TopMenu />
    {route !== '/response' && <TopNav />}
  </Fragment>
);

NavBar.propTypes = {
  route: PropTypes.string,
};

NavBar.defaultProps = {
  route: '',
};
export default NavBar;

