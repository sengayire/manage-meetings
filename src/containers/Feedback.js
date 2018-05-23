import React, { Component, Fragment } from 'react';
import { NavBar, SideBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';

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
