import React, { Component, Fragment } from 'react';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';

class Analytics extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <h1>Analytics</h1>
      </Fragment>
    );
  }
}

export default Analytics;
