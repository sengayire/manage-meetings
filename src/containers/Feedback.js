import React, { Component, Fragment } from 'react';
import { NavBar } from '../components';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';

class Feedback extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <h1>Feedback</h1>
      </Fragment>
    );
  }
}

export default Feedback;
