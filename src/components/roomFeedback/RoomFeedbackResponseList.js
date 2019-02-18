import React, { Fragment } from 'react';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import '../../../src/assets/styles/feedbackContainer.scss';
import IconNotifications from '../../assets/images/download_24px.svg';
import roomFeedbackResponse from '../../fixtures/roomFeedbackResponse';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import BackArrow from '../../components/commons/BackArrow';
import ROUTES from '../../utils/routes';
import TopMenu from '../navbars/TopMenu';

import SingleRoom from './SingleRoom';
import rooms from '../../fixtures/roomFeedbackList';
import Dropdown from '../commons/Dropdown';
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
   * List of items to be exported
   */
  dropOptions = () => (
    <span className="dropdown-list">
      <span>PDF</span>
      <span>JPEG</span>
      <span>CSV</span>
    </span>
  );

  /**
   * Renders export button
   *
   * @returns {JSX}
   */
  renderExportButton = () => (
    <Dropdown
      icon={<img
        className="dropbtn-img"
        src={IconNotifications}
        alt="download icon"
      />}
      content={[this.dropOptions()]}
    />
  );

  /**
   * Renders location input
   *
   * @returns {JSX}
   */
  renderLocationInput = () => (
    <input
      type="text"
      disabled
      value="Nairobi"
      className="feedback-location-input"
      size="12"
    />
  );

  /**
   * Renders filter button
   *
   * @returns {JSX}
   */
  renderFilterButton = () => (
    <span className="feedback-filter-button">
      Filter
      <svg width="18" height="16" className="svg-feedback-filter">
        <path
          d="M6.546 8.66L.195 1.316C-.255.796.123 0 .82 0h16.36c.697 0 1.075.797.625 1.316l-6.35 7.344V15.2c0 .595-.64.981-1.185.716l-3.272-1.6a.798.798 0 0 1-.452-.716V8.66zm8.871-7.06H2.583l5.406 6.25a.79.79 0 0 1 .193.517v4.738l1.636.8V8.367a.79.79 0 0 1 .193-.516L15.417 1.6z"
          fillRule="nonzero"
        />
      </svg>
    </span>
  );

  /**
   * Renders a card
   *
   * @returns {JSX}
   */
  renderCard = () => {
    const cardsContent = [
      {
        title: 'Total Views',
        value: '370',
      },
      {
        title: 'Total Responses',
        value: '300',
      },
      {
        title: 'Start Date',
        value: '07 Feb 2018',
      },
      {
        title: 'Duration',
        value: '1 Week',
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
        <TopMenu />
        <div className="feedback-container">
          <SingleRoom
            rooms={rooms}
            roomId={roomId}
            visible={this.state.visible}
            showModal={this.showModal}
          />
          <BackArrow redirectUri={ROUTES.feedback} />
          <div className="feedback-card ">{this.renderCard()}</div>
          <nav id="feedback-nav">
            {this.renderLocationInput()}
            <section className="feedback-menu-buttons">
              {this.renderFilterButton()}
              {this.renderExportButton()}
            </section>
          </nav>
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
