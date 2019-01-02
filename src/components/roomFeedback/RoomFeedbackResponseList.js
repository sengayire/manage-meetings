import React, { Fragment } from 'react';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import '../../../src/assets/styles/feedbackContainer.scss';
import roomFeedbackResponse from '../../fixtures/roomFeedbackResponse';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import BackArrow from '../../components/commons/BackArrow';
import ROUTES from '../../utils/routes';
import TopMenu from '../navbars/TopMenu';

// maps over the list of feedback and returns each one of them
const roomFeedbackItems = roomFeedbackResponse.map(feedback => (
  <RoomFeedbackResponse roomFeedbackResponse={feedback} key={feedback.id} />
));

const renderExportButton = () => (
  <span className="export-button">
    <svg width="10px" height="10px" viewBox="0 0 433.5 433.5" className="svg-export">
      <path d="M395.25 153h-102V0h-153v153h-102l178.5 178.5L395.25 153zm-357 229.5v51h357v-51h-357z" />
    </svg>
    Export
  </span>
);

const renderLocationInput = () => (
  <input type="text" disabled value="Nairobi" className="feedback-location-input" size="12" />
);

const renderFilterButton = () => (
  <span className="feedback-filter-button">
    Filter
    <svg width="18" height="16" className="svg-feedback-filter">
      <path d="M6.546 8.66L.195 1.316C-.255.796.123 0 .82 0h16.36c.697 0 1.075.797.625 1.316l-6.35 7.344V15.2c0 .595-.64.981-1.185.716l-3.272-1.6a.798.798 0 0 1-.452-.716V8.66zm8.871-7.06H2.583l5.406 6.25a.79.79 0 0 1 .193.517v4.738l1.636.8V8.367a.79.79 0 0 1 .193-.516L15.417 1.6z" fillRule="nonzero" />
    </svg>
  </span>
);

const renderCard = () => {
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

  /* eslint-disable-next-line react/no-array-index-key */
  return cardsContent.map((cardData, index) => <RoomFeedbackCard {...cardData} key={index} />);
};

/**
 * Represents a list of feedback
 * @returns {JSX}
 * @constructor
 */
const RoomFeedbackResponseList = () => (
  <Fragment>
    <TopMenu />
    <div className="feedback-container">
      <BackArrow redirectUri={ROUTES.feedback} />
      <div className="feedback-card ">
        {renderCard()}
      </div>
      <nav id="feedback-nav">
        {renderLocationInput()}
        <section className="feedback-menu-buttons">
          {renderFilterButton()}
          {renderExportButton()}
        </section>
      </nav>
      <header className="room-feedback-list-container">
        <span>Meeting Room</span>
        <span>Responses</span>
        <span>Cleanliness Rating</span>
        <span>Missing Items</span>
        <span>Suggestion on how to improve</span>
      </header>
      {roomFeedbackItems}
    </div>
  </Fragment>
);

export default RoomFeedbackResponseList;

