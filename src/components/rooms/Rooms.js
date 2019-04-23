/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImageLoader from '../commons/ImageLoader';

/**
 * It renders a single room setup
 *
 * @param {Object} props
 *
 * @returns {JSX}
 */
const Room = props => (
  <div className="room-setup-card">
    <ImageLoader
      source={props.roomImage}
      className="room-image"
      altText={props.roomName}
    />
    <div className="room-details-container">
      <div className="room-name">{props.roomName}</div>
      <div className="number-of-Seats">
        <p>Seats upto {props.numberOfSeats} people</p>
      </div>
      <div className="number-of-resources">
        <p>{props.numberOfResources} Resources</p>
      </div>
      <div className="room-details">
        {
          props.roomLabels.map(label => (
            <div className="details">
              <p>{label}</p>
            </div>
            ))
        }
      </div>
    </div>
  </div>
);

export default Room;

Room.propTypes = {
  roomImage: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  roomLabels: PropTypes.array.isRequired,
  numberOfSeats: PropTypes.number.isRequired,
  numberOfResources: PropTypes.number.isRequired,
};
