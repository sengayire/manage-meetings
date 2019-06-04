import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../commons/ErrorIcon';
import { getRoomResources } from '../helpers/QueriesHelpers';
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
  state = {
    roomResources: [
      {
        room: [
          {
            quantity: 0,
            resource: {
              name: '',
              room: [
                {
                  name: '',
                },
              ],
            },
          },
        ],
      },
    ],
    error: false,
  };

  componentDidMount = async () => {
    await this.getResourceData();
  }

  getResourceData = async () => {
    try {
      const resource = await getRoomResources(this.props.roomFeedbackResponse.roomId);
      this.setState({
        roomResources: resource,
        error: false,
      });
    } catch (error) {
      if (error && error.message === 'GraphQL error: Room has no resource yet') {
        this.setState({
          error: false,
        });
        return;
      }
      this.setState({
        error: true,
      });
    }
  };


  getResponseSuggestion = (roomResponses = []) => {
    const suggestionResponseList = roomResponses.filter(response => (response.response.__typename === 'TextArea'));
    if (suggestionResponseList.length > 0) {
      const { suggestion } = suggestionResponseList[0].response;
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
        response,
      },
    } = this.props;

    if (this.state.error) {
      return (
        <ErrorIcon />
      );
    }

    let totalRoomResources;

    if (this.state.roomResources) {
      totalRoomResources = this.props.totalRoomResources(this.state.roomResources);
    }

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
  }).isRequired,
  activeRoomId: PropTypes.number,
  viewSingleFeed: PropTypes.func.isRequired,
  roomCleanlinessRating: PropTypes.func.isRequired,
  totalCleanlinessRating: PropTypes.func.isRequired,
  totalMissingItemsCount: PropTypes.func.isRequired,
  totalRoomResources: PropTypes.func.isRequired,
};

RoomFeedbackResponse.defaultProps = {
  activeRoomId: null,
};

export default RoomFeedbackResponse;
