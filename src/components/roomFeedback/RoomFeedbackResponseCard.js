import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represents the cards of data
 *
 * @param {Object} roomFeedbackCard
 *
 * @returns {JSX}
 *
 * @constructor
 */
const RoomFeedbackCard = ({ title, value }) => (
  <section>
    <p>{title}</p>
    <p>{value}</p>
  </section>
);

RoomFeedbackCard.defaultProps = {
  title: 'Title',
  value: 0,
};

RoomFeedbackCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export default RoomFeedbackCard;
