import React, { Fragment } from 'react';
import { NavBar } from '../components';
import RoomFeedback from '../components/RoomFeedback';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/feedbackContainer.scss';

const Feedback = () => (
  <Fragment>
    <NavBar />
    <div className="feedback-container">
      <RoomFeedback />
    </div>
  </Fragment>
);

export default Feedback;
