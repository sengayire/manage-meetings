import React, { Fragment } from 'react';
import { NavBar } from '../components';
import RoomFeedbackResponseList from '../components/roomFeedback/RoomFeedbackResponseList';
import '../assets/styles/custom.scss';
import '../assets/styles/topmenu.scss';
import '../assets/styles/feedbackContainer.scss';

const Feedback = () => (
  <Fragment>
    <NavBar />
    <div className="feedback-container">
      <RoomFeedbackResponseList />
    </div>
  </Fragment>
);

export default Feedback;
