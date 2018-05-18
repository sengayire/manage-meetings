import React, { Component, Fragment } from 'react';
import { NavBar, SideBar } from '../components';

class Analytics extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <SideBar />
        <h1>Analytics</h1>
      </Fragment>
    );
  }
}

export default Analytics;
