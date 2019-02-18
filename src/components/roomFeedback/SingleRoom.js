import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import '../../assets/styles/SingelRoomSideModel.scss';
import greenStar from '../../assets/images/green_star.svg';
import greyStar from '../../assets/images/grey_star.svg';
import Spinner from '../commons/Spinner';
import ErrorIcon from '../commons/ErrorIcon';
import SINGLE_ROOM_FEEDBACK from '../../graphql/queries/RoomFeedback';
import { GET_ROOM_RESOURCES } from '../../graphql/queries/Resources';

export class SingleRoomFeedBack extends Component {
  state = {};

  /**
   * Format UTC date time to
   * MM-DD-YY format
   *
   * @param {string} dateString
   *
   * @return {string}
   */
  formatDate = (dateString) => {
    const allMonths = [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October',
      'November', 'December',
    ];
    const date = new Date(dateString);
    return `${allMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  /**
   * Loops through the room responses
   * and calculates the total number of missing
   * items
   *
   * @param {array} roomResponses
   *
   * @return {integer}
   */
  totalMissingItemsCount = (roomResponses) => {
    let missingItemsList = [];
    roomResponses.filter(response => ((response.missingItems).length !== 0))
      .forEach((response) => {
        missingItemsList = [...new Set(response.missingItems)];
      });
    return missingItemsList.length;
  }

  /**
   * Loops through the room responses
   * and calculates the total cleanliness
   * rating and grade
   *
   * @param {array} roomResponses
   *
   * @return {integer, string}
   */
  totalCleanlinessRating = (roomResponses) => {
    let totalRating = 0;
    const gradeList = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    if (roomResponses.length > 0) {
      const ratingResponses = roomResponses.filter(response => response.rating !== null);
      ratingResponses.forEach((singleResponse) => { totalRating += singleResponse.rating; });
      totalRating = Math.round(totalRating / (ratingResponses.length));
      const grade = gradeList[(totalRating - 1)];
      return { totalRating, grade };
    }
    return { totalRating };
  }

  /**
   * Loops through the room cleanliness
   * ratings and determines how to render
   * the green and grey Stars.
   *
   * @param {integer} rating
   *
   * @return {JSX}
   */
  roomCleanlinessRating = (rating) => {
    let rated = rating;
    const data = [];
    while (rated > 0) {
      data.push(<img key={rated} src={greenStar} alt="" />);
      rated -= 1;
    }
    let unRated = 5 - rating;
    while (unRated > 0) {
      data.push(<img key={5 + unRated} src={greyStar} alt="" />);
      unRated -= 1;
    }
    return data;
  };

  /**
   * Loops through the room responses
   * and returns a list of the room's feedback
   *
   * @param {array} responses
   *
   * @return {JSX}
   */
  roomFeedbackList = (responses) => {
    let data;
    if (responses.length > 0) {
      data = [...responses].reverse().map(response => (
        <div key={response.responseId} className="response">
          <div className="date">{this.formatDate(response.createdDate)}</div>
          { this.renderRoomFeeback(response) }
        </div>
      ));
    } else {
      data = (
        <div className="item-list-empty">
          <div className="message">This room has no responses</div>
        </div>
      );
    }
    return data;
  };

  /**
   * Conditionally renders responses that are
   * either ratings, suggestions or checks
   *
   * @param {object} response
   *
   * @return {JSX}
   */
  renderRoomFeeback = (response) => {
    const { getResourcesByRoomId: resources } = this.props.roomResources;
    const resourcesList = resources.map(resource => resource.name);
    if (response.suggestion) {
      return (
        <div className="response-item">
          <div className="text-comment-heading">Suggestion</div>
          <div className="text-comment">
            {response.suggestion}
          </div>
        </div>
      );
    } else if ((response.missingItems).length > 0) {
      return (
        <div className="item-list response-item">
          <div className="item-list-heading">Missing Items</div>
          <div />
          <div className="items">
            {resourcesList.map(item => (
              <label htmlFor={item} key={item}>
                <input
                  id={response.responseId}
                  type="checkbox"
                  defaultChecked={(response.missingItems).includes(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="item-list response-item">
        <div className="item-list-heading">Cleanliness</div>
        <div />
        <div className="cleanliness">{this.roomCleanlinessRating(response.rating)}</div>
      </div>
    );
  }

  /**
   * Conditionally renders a spinner, error message
   * or content
   *
   * @param {object} props
   *
   * @return {JSX}
   */
  renderModalContent = ({ loading, error }) => {
    if (error) {
      return (
        <Fragment>
          <div className="modal-header">
            <a href="/" className="cancel" onClick={this.props.showModal}>
              Cancel
            </a>
          </div>
          <ErrorIcon />
        </Fragment>
      );
    } else if (loading) {
      return <div className="modal-spinner"><Spinner /></div>;
    }
    const {
      roomName,
      totalResponses,
      totalRoomResources,
      response,
    } = this.props.data.roomResponse;
    const totalMissingItems = this.totalMissingItemsCount(response);
    const { totalRating, grade } = this.totalCleanlinessRating(response);
    return (
      <Fragment>
        <div className="modal-header">
          {roomName}
          <a href="/" className="cancel" onClick={this.props.showModal}>
            Cancel
          </a>
        </div>
        <div className="row-1">
          <div className="row-1-headings">
            <div>Missing Tools</div>
            <div>Cleanliness</div>
          </div>
          <div className="row-1-data">
            <div>{`${totalMissingItems} out of ${totalRoomResources}`}</div>
            <div>
              {this.roomCleanlinessRating(totalRating)}
              <br />
              <div className="row-1-grade">
                {grade}
              </div>
            </div>
          </div>
        </div>
        <div className="row-2-heading">
          {totalResponses} Responses
        </div>
        <div className="row-2">{this.roomFeedbackList(response)}</div>
      </Fragment>
    );
  };

  render() {
    const { roomId } = this.props;
    const { loading, error } = this.props.data;
    return !this.props.visible || !roomId ? null : (
      <div className="modal-wrapper">
        {this.renderModalContent({ loading, error })}
      </div>
    );
  }
}

SingleRoomFeedBack.propTypes = {
  data: PropTypes.shape({
    roomResponse: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
  roomResources: PropTypes.instanceOf(Object),
  visible: PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  roomId: PropTypes.number,
};

SingleRoomFeedBack.defaultProps = {
  roomId: null,
  roomResources: {},
  showModal: PropTypes.func,
};

const queryVariables = () => ({
  variables: {
    roomId: 174,
  },
});

export default compose(
  graphql(GET_ROOM_RESOURCES, {
    name: 'roomResources',
    options: queryVariables,
  }),
  graphql(SINGLE_ROOM_FEEDBACK, {
    options: queryVariables,
  }),
)(SingleRoomFeedBack);
