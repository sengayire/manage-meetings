import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import '../../assets/styles/SingelRoomSideModel.scss';
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
    const { roomResources: { error }, roomCleanlinessRating } = this.props;
    let resourcesList;
    if (error) {
      resourcesList = [];
    } else {
      const {
        roomResources: { getResourcesByRoomId: resources },
      } = this.props;
      resourcesList = resources.map(resource => resource.name);
    }
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
        <div className="cleanliness">{roomCleanlinessRating(response.rating)}</div>
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
      data: {
        roomResponse: {
          roomName,
          totalResponses,
          totalRoomResources,
          response,
        },
      },
      totalCleanlinessRating,
      roomCleanlinessRating,
      totalMissingItemsCount,
    } = this.props;
    const totalMissingItems = totalMissingItemsCount(response);
    const { totalRating, grade } = totalCleanlinessRating(response);
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
              {roomCleanlinessRating(totalRating)}
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
  roomCleanlinessRating: PropTypes.func.isRequired,
  totalCleanlinessRating: PropTypes.func.isRequired,
  totalMissingItemsCount: PropTypes.func.isRequired,
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

const queryVariables = props => ({
  variables: {
    roomId: props.roomId,
  },
  fetchPolicy: 'cache-and-network',
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
