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

RoomFeedbackCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default RoomFeedbackCard;
