import React from 'react';
import '../../../src/assets/styles/roomFeedbackResponseCard.scss';

/**
 * Represents the cards of data
 * @returns {JSX}
 * @constructor
 */
const RoomFeedbackCard = () => (
  <div className="feedback-card ">
    <section>
      <p>Total Views</p>
      <p>370</p>
    </section>
    <section>
      <p>Total Responses</p>
      <p>300</p>
    </section>
    <section>
      <p>Start Date</p>
      <p>07 Feb 2018</p>
    </section>
    <section>
      <p>Duration</p>
      <p>1 Week</p>
    </section>
  </div>
);

export default RoomFeedbackCard;
