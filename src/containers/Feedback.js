/* eslint-disable import/no-named-as-default */
import React, { Fragment } from 'react';
import { NavBar } from '../components';
import RoomFeedbackComponent from '../components/roomFeedback/RoomFeedback';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/feedbackContainer.scss';

const Feedback = () => (
  <Fragment>
    <NavBar />
    <div className="feedback-container">
      <RoomFeedbackComponent />
    </div>
  </Fragment>
);

export default Feedback;
