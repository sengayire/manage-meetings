import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import greyStar from '../../../src/assets/images/star_grey.svg';
import greenStar from '../../../src/assets/images/star_green.svg';
import '../../../src/assets/styles/roomFeedbackResponse.scss';

/**
 * Creates stars
 * @param rating
 * @returns {{starImage: Array, rateText: string}}
 */
export const starRate = (rating:0) => {
  const starImage = [];
  let rateText;

  // check star rating values and assign them to the list
  switch (rating) {
    case 1:
      for (let step = 0; step < rating; step += 1) {
        starImage.push(<img src={greenStar} alt={`star rating of ${rating}`} key={uuidv4()} />);
      }
      rateText = 'Very Poor';
      break;

    case 2:
      for (let step = 0; step < rating; step += 1) {
        starImage.push(<img src={greenStar} alt={`star rating of ${rating}`} key={uuidv4()} />);
      }
      rateText = 'Poor';
      break;

    case 3:
      for (let step = 0; step < rating; step += 1) {
        starImage.push(<img src={greenStar} alt={`star rating of ${rating}`} key={uuidv4()} />);
      }
      rateText = 'Good';
      break;

    case 4:
      for (let step = 0; step < rating; step += 1) {
        starImage.push(<img src={greenStar} alt={`star rating of ${rating}`} key={uuidv4()} />);
      }
      rateText = 'Very Good';
      break;

    case 5:
      for (let step = 0; step < rating; step += 1) {
        starImage.push(<img src={greenStar} alt={`star rating of ${rating}`} key={uuidv4()} />);
      }
      rateText = 'Excellent';
      break;

    default:
      for (let step = 0; step < 5; step += 1) {
        starImage.push(<img src={greyStar} alt="star rating of 0" key={uuidv4()} />);
      }
      rateText = 'Not Rated';
      break;
  }
  for (let i = 0; starImage.length < 5; i += 1) {
    starImage.push(<img src={greyStar} alt="star rating of 0" key={uuidv4()} />);
  }
  return { starImage, rateText };
};

/**
 * Represents a single feedback
 * @param room
 * @param responses
 * @param rating
 * @param missingItems
 * @param suggestion
 * @returns {jsx}
 * @constructor
 */
const RoomFeedbackResponse = ({
  roomFeedbackResponse: {
    room, responses, rating, missingItems, suggestion,
  },
}) => {
  const { starImage, rateText } = starRate(rating);
  const allStars = starImage.map(star => star);

  return (
    <div className="room-feedback-container">
      <span>{room}</span>
      <span>{responses}</span>
      <span>{allStars} <span className="star-text">{rateText}</span></span>
      <span>{missingItems}</span>
      <span>{suggestion.substring(0, 20)}...</span>
    </div>
  );
};

RoomFeedbackResponse.propTypes = {
  roomFeedbackResponse: PropTypes.shape({
    room: PropTypes.string.isRequired,
    responses: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    missingItems: PropTypes.string.isRequired,
    suggestion: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomFeedbackResponse;
