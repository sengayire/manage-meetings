import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import RoomFeedbackResponse from './RoomFeedbackResponse';
import { greenStarIcon, greyStarIcon } from '../../utils/images/images';
import '../../../src/assets/styles/roomFeedbackResponseList.scss';
import '../../../src/assets/styles/feedbackContainer.scss';
import Spinner from '../commons/Spinner';
import ErrorIcon from '../commons/ErrorIcon';
import RoomFeedbackCard from './RoomFeedbackResponseCard';
import SingleRoom from './SingleRoom';
import { ALL_ROOM_FEEDBACK } from '../../graphql/queries/RoomFeedback';
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
export const totalCleanlinessRating = (roomResponses) => {
  let totalRating = 0;
  const gradeList = ['Not Rated', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const ratingResponses = roomResponses.filter(response => response.rating !== null);
  ratingResponses.forEach((singleResponse) => { totalRating += singleResponse.rating; });
  totalRating = Math.round(totalRating / (ratingResponses.length));
  const grade = gradeList[(totalRating)];
  return { totalRating, grade };
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
export const totalMissingItemsCount = (roomResponses) => {
  let missingItemsList = [];
  roomResponses.filter(response => ((response.missingItems).length !== 0))
    .forEach((response) => {
      missingItemsList = [...new Set(response.missingItems)];
    });
  return missingItemsList.length;
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
    };
  }

  componentWillReceiveProps(props) {
    const { allRoomResponses } = props.data;
    this.setState({
      allRoomResponses,
    });
  }
  /**
   * Loops through the room responses
   * and calculates the total number of responses
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  getTotalResponses = (rooms) => {
    let totalResponses = 0;
    rooms.forEach((room) => {
      totalResponses += ((room.response).length);
    });
    return totalResponses;
  };

  /**
   * Loops through the room responses
   * and calculates the total number of rooms
   * with missing items
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  getRoomsWithMissingItems = (rooms) => {
    let roomsWithMissingItemsCount = 0;
    rooms.map(room => room.response)
      .forEach((responses) => {
        const missingItemsRooms = responses.filter(response => (response.missingItems).length > 0);
        if (missingItemsRooms.length > 0) {
          roomsWithMissingItemsCount += 1;
        }
      });
    return roomsWithMissingItemsCount;
  };

  /**
   * Loops through the room responses
   * and calculates the average room rating
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  getTotalAverageRating = (rooms) => {
    let ratingsCount = 0;
    let totalRating = 0;
    rooms.forEach((room) => {
      (room.response).forEach((response) => {
        if (response.rating) {
          totalRating += (response.rating);
          ratingsCount += 1;
        }
      });
    });
    return (Math.round(totalRating / ratingsCount));
  };

  /**
   * Loops through the room responses
   * and transforms the data to an acceptable format
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  formatAllRoomFeedbackData = (rooms) => {
    const roomsResponses = rooms.filter(room => (room.response).length > 0);
    const totalResponses = this.getTotalResponses(roomsResponses);
    const roomsWithMissingItems = this.getRoomsWithMissingItems(roomsResponses);
    const totalAverageRating = this.getTotalAverageRating(roomsResponses);
    return {
      totalResponses,
      roomsWithMissingItems,
      totalAverageRating,
      roomsResponses,
    };
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
          lowerLimit: 1,
          upperLimit: 10000,
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
      roomId, isFetching, currentPage, allRoomResponses,
    } = this.state;
    const { loading, error } = this.props.data;
    if (error) {
      const errorString = 'You are not authorized to perform this action';
      const errorMessage = (error.message === `GraphQL error: ${errorString}` ? errorString : '');
      return (
        <div className="item-list-empty">
          <ErrorIcon message={errorMessage} />
        </div>);
    } else if (loading) {
      return <Spinner />;
    }
    const feedbackData = this.formatAllRoomFeedbackData(allRoomResponses.responses);
    if ((feedbackData.roomsResponses).length > 0) {
      return (
        <Fragment>
          <div className="feedback-container">
            <SingleRoom
              roomId={roomId}
              visible={this.state.visible}
              showModal={this.showModal}
              totalCleanlinessRating={totalCleanlinessRating}
              roomCleanlinessRating={roomCleanlinessRating}
              totalMissingItemsCount={totalMissingItemsCount}
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
              {(feedbackData.roomsResponses).map(feedback => (
                <RoomFeedbackResponse
                  activeRoomId={roomId}
                  roomFeedbackResponse={feedback}
                  key={feedback.roomId}
                  viewSingleFeed={this.showModal}
                  totalCleanlinessRating={totalCleanlinessRating}
                  roomCleanlinessRating={roomCleanlinessRating}
                  totalMissingItemsCount={totalMissingItemsCount}
                />
            ))}
            </div>
            { !error && <Pagination
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
};

export default graphql(ALL_ROOM_FEEDBACK, {
  options: /* istanbul ignore next */ () => ({
    variables: {
      page: 1,
      perPage: 5,
      lowerLimit: 1,
      upperLimit: 10000,
    },
  }),
},
)(RoomFeedbackResponseList);
