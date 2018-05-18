import React, { Component, Fragment } from 'react';
import { NavBar, SideBar } from '../components';

class Feedback extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <SideBar />
        <h1>Feedback</h1>
      </Fragment>
    );
  }
}

export default Feedback;
