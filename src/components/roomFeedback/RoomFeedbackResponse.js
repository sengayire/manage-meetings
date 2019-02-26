import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../src/assets/styles/roomFeedbackResponse.scss';

/**
 * Represents a single feedback
 *
 * @param {Object} roomFeedbackResponse
 *
 * @returns {jsx}
 *
 */
class RoomFeedbackResponse extends Component {
  getResponseSuggestion = (roomResponses) => {
    const suggestionResponseList = roomResponses.filter(response => (response.suggestion !== null));
    if (suggestionResponseList.length > 0) {
      const { suggestion } = suggestionResponseList[0];
      return suggestion;
    }
    return '';
  };

  showModal = (e) => {
    const {
      roomFeedbackResponse: { roomId },
      viewSingleFeed,
    } = this.props;
    viewSingleFeed(e, roomId);
  };

  render() {
    const {
      activeRoomId,
      roomCleanlinessRating,
      totalCleanlinessRating,
      totalMissingItemsCount,
      roomFeedbackResponse: {
        roomId,
        roomName,
        totalResponses,
        totalRoomResources,
        response,
      },
    } = this.props;
    const totalMissingItems = totalMissingItemsCount(response);
    const { totalRating, grade } = totalCleanlinessRating(response);
    const suggestion = this.getResponseSuggestion(response);
    return (
      <div className={`room-feedback-container ${(activeRoomId === roomId) ? 'active' : ''}`}>
        <span>
          <a href="/" onClick={this.showModal}>
            {roomName}
          </a>
        </span>
        <span>{totalResponses}</span>
        <span>
          {roomCleanlinessRating(totalRating)} <span className="star-text">{grade}</span>
        </span>
        <span>{`${totalMissingItems} out of ${totalRoomResources}`}</span>
        <span>{suggestion.substring(0, 20)}...</span>
      </div>
    );
  }
}

RoomFeedbackResponse.propTypes = {
  roomFeedbackResponse: PropTypes.shape({
    roomId: PropTypes.number.isRequired,
    roomName: PropTypes.string.isRequired,
    response: PropTypes.array.isRequired,
    totalResponses: PropTypes.number.isRequired,
    totalRoomResources: PropTypes.number.isRequired,
  }).isRequired,
  activeRoomId: PropTypes.number,
  viewSingleFeed: PropTypes.func.isRequired,
  roomCleanlinessRating: PropTypes.func.isRequired,
  totalCleanlinessRating: PropTypes.func.isRequired,
  totalMissingItemsCount: PropTypes.func.isRequired,
};

RoomFeedbackResponse.defaultProps = {
  activeRoomId: null,
};

export default RoomFeedbackResponse;
