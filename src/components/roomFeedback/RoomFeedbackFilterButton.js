import React, { Fragment } from 'react';
import '../../../src/assets/styles/roomFeedbackFilterButton.scss';

/**
 * Represents a filter button
 * @returns {JSX}
 * @constructor
 */
const RoomFeedbackFilterButton = () => (
  <Fragment>
    <span className="feedback-filter-button">
     Filter
      <svg width="18" height="16" className="svg-feedback-filter">
        <path d="M6.546 8.66L.195 1.316C-.255.796.123 0 .82 0h16.36c.697 0 1.075.797.625 1.316l-6.35 7.344V15.2c0 .595-.64.981-1.185.716l-3.272-1.6a.798.798 0 0 1-.452-.716V8.66zm8.871-7.06H2.583l5.406 6.25a.79.79 0 0 1 .193.517v4.738l1.636.8V8.367a.79.79 0 0 1 .193-.516L15.417 1.6z" fillRule="nonzero" />
      </svg>
    </span>
  </Fragment>
);

export default RoomFeedbackFilterButton;
