import React, { Fragment } from 'react';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import '../../../src/assets/styles/feedbackContainer.scss';
import roomFeedbackResponse from '../../fixtures/roomFeedbackResponse';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import SingleRoom from './SingleRoom';
import rooms from '../../fixtures/roomFeedbackList';
/**
 * Component for RoomFeedbackResponseList
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
class RoomFeedbackResponseList extends React.Component {
  state = {
    visible: false,
  };

  /**
   * Sets component state after comparing roomId state with id argument
   *
   * @param {Object} event
   * @param {string} id
   */
  showModal = (e, id = null) => {
    e.preventDefault();
    const { roomId } = this.state;
    if (id === null) {
      this.setState({
        visible: !this.state.visible,
        roomId: id,
      });
    } else if (id !== roomId) {
      this.setState({ visible: true, roomId: id });
    } else {
      this.setState({ visible: false, roomId: null });
    }
  };

  /**
   * Renders a card
   *
   * @returns {JSX}
   */
  renderCard = () => {
    const cardsContent = [
      {
        title: 'Total Responses',
        value: '300',
      },
      {
        title: 'Rooms With Missing Items',
        value: '18',
      },
      {
        title: 'Average Ratings',
        value: '3.5',
      },
    ];

    return cardsContent.map((cardData, index) => (
      /* eslint-disable-next-line react/no-array-index-key */
      <RoomFeedbackCard {...cardData} key={index} />
    ));
  };

  render() {
    const { roomId } = this.state;
    return (
      <Fragment>
        <div className="feedback-container">
          <SingleRoom
            rooms={rooms}
            roomId={roomId}
            visible={this.state.visible}
            showModal={this.showModal}
          />
          <div className="feedback-card ">{this.renderCard()}</div>
          <header className="room-feedback-list-container">
            <span>Meeting Room</span>
            <span>Responses</span>
            <span>Cleanliness Rating</span>
            <span>Missing Items</span>
            <span>Suggestion on how to improve</span>
          </header>
          {roomFeedbackResponse.map(feedback => (
            <RoomFeedbackResponse
              activeRoomId={roomId}
              roomFeedbackResponse={feedback}
              key={feedback.id}
              viewSingleFeed={this.showModal}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}
export default RoomFeedbackResponseList;
