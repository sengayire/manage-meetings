import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import { greenStarIcon, greyStarIcon } from '../../utils/images/images';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import '../../../src/assets/styles/feedbackContainer.scss';
import ErrorIcon from '../commons/ErrorIcon';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import SingleRoom from './SingleRoom';
import Pagination from '../../../src/components/commons/Pagination';
import Overlay from '../commons/Overlay';

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
  const averageRating = Math.round(totalRating / (responsesWithRating.length));
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
      allRoomResponses: { ...props.data.allRoomResponses },
      visible: false,
      roomId: null,
      currentPage: 1,
      isFetching: false,
      feedback: { roomsResponses: [] },
    };
  }

  componentWillReceiveProps(props) {
    const { feedback } = props;
    const { allRoomResponses } = props.data;
    this.setState({
      allRoomResponses,
      feedback,
    });
  }

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
   * Queries resources list
   *
   * @param {Integer} perPage
   * @param {Integer} page
   *
   * @returns {void}
   */
  handleData = (perPage, page) => {
    this.setState({ isFetching: true });
    /* istanbul ignore next */
    /* Reasoning: find explicit way of testing configuration options */
    this.props.data
      .fetchMore({
        variables: {
          page,
          perPage,
          lowerLimitCount: 0,
          upperLimitCount: 100,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          this.setState({
            allRoomResponses: fetchMoreResult.allRoomResponses,
            currentPage: page,
          });
        },
      })
      .then(() => this.setState({ isFetching: false }))
      .catch(() => this.setState({ isFetching: false }));
  };

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
      roomId, isFetching, currentPage, allRoomResponses, feedback,
    } = this.state;
    const { loading, error } = this.props.data;

    if (error) {
      const errorString = 'You are not authorized to perform this action';
      const errorMessage = (error.message === `GraphQL error: ${errorString}` ? errorString : '');
      return (
        <div className="item-list-empty">
          <ErrorIcon message={errorMessage} />
        </div>);
    }
    const feedbackData = loading
      ? {
        roomsResponses: [{
          roomId: 1,
          roomName: 'Sample',
          response: [],
          totalResponses: 1,
          totalRoomResources: 1,
        }],
      }
      : feedback;

    if (loading || (feedbackData.roomsResponses).length > 0) {
      return (
        <Fragment>
          <div className="feedback-container overlay-container">
            {loading && <Overlay />}
            <SingleRoom
              roomId={roomId}
              visible={this.state.visible}
              showModal={this.showModal}
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
            {!error && <Pagination
              totalPages={allRoomResponses.pages}
              hasNext={allRoomResponses.hasNext}
              hasPrevious={allRoomResponses.hasPrevious}
              handleData={this.handleData}
              currentPage={currentPage}
              isFetching={isFetching}
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
  data: PropTypes.shape({
    allRoomResponses: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchMore: PropTypes.func,
  }).isRequired,
  feedback: PropTypes.shape({}).isRequired,
};

export default RoomFeedbackResponseList;
