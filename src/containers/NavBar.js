import React, { Fragment } from 'react';
import TopNav from '../components/navbars/TopNav';
import TopMenu from '../components/navbars/TopMenu';

const NavBar = () => (
  <Fragment>
    <TopMenu />
    <TopNav />
    {/* <AnalyticsNav /> */}
  </Fragment>
);

export default NavBar;
