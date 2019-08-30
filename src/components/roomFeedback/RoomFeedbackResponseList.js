import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import { greenStarIcon, greyStarIcon } from '../../utils/images/images';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import '../../../src/assets/styles/feedbackContainer.scss';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import SingleRoom from './SingleRoom';
import Pagination from '../../../src/components/commons/Pagination';
import Overlay from '../commons/Overlay';
import paginate from '../helpers/FrontendPagination';

/**
 * Loops through the room responses
 * and calculates the total number of missing
 * items
 *
 * @param {array} roomResponses
 *
 * @return {integer}
 */
export const roomCleanlinessRating = (rating) => {
  let rated = rating;
  const data = [];
  while (rated > 0) {
    data.push(<img key={rated} src={greenStarIcon} alt="" />);
    rated -= 1;
  }
  let unRated = 5 - rating;
  while (unRated > 0) {
    data.push(<img key={5 + unRated} src={greyStarIcon} alt="" />);
    unRated -= 1;
  }
  return data;
};

/**
 * Loops through the room responses
 * and calculates the total cleanliness
 * rating and grade
 *
 * @param {array} roomResponses
 *
 * @return {integer, string}
 */
export const totalCleanlinessRating = (roomResponses = []) => {
  let totalRating = 0;
  const gradeList = ['Not Rated', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const responsesWithRating = roomResponses.filter(response => response.response.__typename === 'Rate');
  responsesWithRating.forEach((singleResponse) => { totalRating += singleResponse.response.rate; });
  let averageRating = Math.round(totalRating / (responsesWithRating.length));
  if (Number.isNaN(averageRating)) {
    averageRating = 0;
  }
  const grade = gradeList[(averageRating)];
  return { averageRating, grade };
};

/**
 * Loops through the room responses
 * and calculates the total number of missing
 * items
 *
 * @param {array} roomResponses
 *
 * @return {integer}
 */
export const totalMissingItemsCount = (roomResponses = []) => {
  let missingItemsList = [];
  const responsesWithMissingItems = roomResponses.filter(response => response.response.__typename === 'MissingItems');
  responsesWithMissingItems.forEach((response) => {
    missingItemsList = [...new Set(response.response.missingItems)];
  });
  return missingItemsList.length;
};

/**
 * Calculates the total number of room resources
 *
 * @param {array} roomResources
 *
 * @return {integer}
 */
export const totalRoomResources = (roomResources = []) => {
  const totalRoomResourcesNumber = roomResources.reduce(
    (accumulator, currentValue) => accumulator + currentValue.room[0].quantity,
    0,
  );
  return totalRoomResourcesNumber;
};

/**
 * Component for RoomFeedbackResponseList
 *
 * @extends React.Component
 *
 * @returns {JSX}
 */
export class RoomFeedbackResponseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      roomId: null,
      responseIds: [],
      currentPage: 1,
      isFetching: false,
    };
  }

  /**
   * Sets component state after comparing roomId state with id argument
   *
   * @param {Object} event
   * @param {string} id
   */
  showModal = (e, data = null) => {
    e.preventDefault();
    if (data) {
      const { roomId, responseIds } = data;
      this.setState({ visible: true, roomId, responseIds });
    } else {
      this.setState({ visible: false, roomId: null, responseIds: [] });
    }
  };

  /**
   * Queries resources list
   *
   * @param {Integer} perPage
   * @param {Integer} page
   *
   * @returns {void}
   */
  handleData = (perPageData, currentPageData) => this.setState({
    perPage: perPageData,
    currentPage: currentPageData,
  });

  /**
   * Renders a card
   *
   * @returns {JSX}
   */
  renderCard = (feedbackData) => {
    const { totalResponses, roomsWithMissingItems, totalAverageRating } = feedbackData;
    const cardsContent = [
      {
        title: 'Total Responses',
        value: totalResponses,
      },
      {
        title: 'Rooms With Missing Items',
        value: roomsWithMissingItems,
      },
      {
        title: 'Average Ratings',
        value: totalAverageRating,
      },
    ];
    return cardsContent.map((cardData, index) => (
      /* eslint-disable-next-line react/no-array-index-key */
      <RoomFeedbackCard {...cardData} key={index} />
    ));
  };

  render() {
    const {
      roomId, isFetching, currentPage, perPage, responseIds,
    } = this.state;
    const { feedback, loading } = this.props;

    const feedbackData = loading
      ? {
        roomsResponses: [{
          roomId: 1,
          roomName: 'Sample',
          response: [],
          totalResponses: 1,
          totalRoomResources: 1,
        }],
      } : {
        ...feedback,
        ...paginate(feedback.roomsResponses, { currentPage, perPage }, { dataName: 'roomsResponses' }),
      };

    const displayPaginator = !isFetching
      && !(feedbackData.roomsResponses.length < 5 && currentPage === 1);

    if (loading || (feedbackData.roomsResponses).length > 0) {
      return (
        <Fragment>
          <div className="feedback-container overlay-container">
            {loading && <Overlay />}
            <SingleRoom
              roomId={roomId}
              visible={this.state.visible}
              showModal={this.showModal}
              responseIds={responseIds}
              totalCleanlinessRating={totalCleanlinessRating}
              roomCleanlinessRating={roomCleanlinessRating}
              totalMissingItemsCount={totalMissingItemsCount}
              totalRoomResources={totalRoomResources}
            />
            <div className="feedback-card ">{this.renderCard(feedbackData)}</div>
            <div className="feedback-reponses-list">
              {isFetching ? <Overlay /> : null}
              <header className="room-feedback-list-container">
                <span>Meeting Room</span>
                <span>Responses</span>
                <span>Cleanliness Rating</span>
                <span>Missing Items</span>
                <span>Suggestion on how to improve</span>
              </header>
              {(feedbackData.roomsResponses).map(singleFeedback => (
                <RoomFeedbackResponse
                  activeRoomId={roomId}
                  roomFeedbackResponse={singleFeedback}
                  key={singleFeedback.roomId}
                  viewSingleFeed={this.showModal}
                  totalCleanlinessRating={totalCleanlinessRating}
                  roomCleanlinessRating={roomCleanlinessRating}
                  totalMissingItemsCount={totalMissingItemsCount}
                  totalRoomResources={totalRoomResources}
                />
              ))}
            </div>
            {displayPaginator && <Pagination
              totalPages={feedbackData.pages}
              hasNext={feedbackData.hasNext}
              hasPrevious={feedbackData.hasPrevious}
              handleData={this.handleData}
              currentPage={currentPage}
              isFetching={isFetching}
              perPage={perPage ? Number(perPage) : 5}
            />}
          </div>
        </Fragment>
      );
    }
    return (
      <div className="item-list-empty">
        <div className="message">There are no rooms with responses</div>
      </div>
    );
  }
}

RoomFeedbackResponseList.propTypes = {
  loading: PropTypes.bool.isRequired,
  feedback: PropTypes.shape({}).isRequired,
};

export default RoomFeedbackResponseList;
