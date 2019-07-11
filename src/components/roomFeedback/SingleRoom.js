import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/SingelRoomSideModel.scss';
import Spinner from '../commons/Spinner';
import { getRoomResources, getSingleRoomFeedback } from '../helpers/QueriesHelpers';

export class SingleRoomFeedBack extends Component {
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
    roomResponse: {
      roomName: 'DemoRoomState',
      totalResponses: 1,
      response: [
        {
          responseId: 282,
          createdDate: '2019-06-25T10:40:23.818174',
          resolved: false,
          response: {
            __typename: 'Rate',
            rate: 5,
          },
        },
      ],
    },
    isFetching: false,
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.roomId !== prevProps.roomId) {
      await this.getResourceData();
      await this.getFeedbackData();
    }
  }

  getFeedbackData = async () => {
    this.setState({ isFetching: true });
    try {
      const feedback = await getSingleRoomFeedback(this.props.roomId);

      this.setState({
        roomResponse: feedback,
        isFetching: false,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
      });
    }
  };

  getResourceData = async () => {
    this.setState({ isFetching: true });
    try {
      const resource = await getRoomResources(this.props.roomId);

      this.setState({
        isFetching: false,
        roomResources: resource,
      });
    } catch (error) {
      if (error && error.message === 'GraphQL error: Room has no resource yet') {
        this.setState({
          isFetching: false,
        });
        return;
      }
      this.setState({
        isFetching: false,
      });
    }
  };


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
  roomFeedbackList = (responses, roomResources) => {
    let data;
    if (responses.length > 0) {
      data = [...responses].reverse().map(response => (
        <div key={response.responseId} className="response">
          <div className="date">{this.formatDate(response.createdDate)}</div>
          {this.renderRoomFeeback(response, roomResources)}
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

  renderSpinner = () => (
    <div className="modal-spinner"><Spinner /></div>
  )

  /**
   * Conditionally renders responses that are
   * either ratings, suggestions or checks
   *
   * @param {object} response
   *
   * @return {JSX}
   */
  renderRoomFeeback = (response, roomResources) => {
    const { roomCleanlinessRating } = this.props;
    let resourcesList;
    if (!roomResources) {
      resourcesList = [];
    } else {
      roomResources && (resourcesList = roomResources.map(
        resource => resource.room[0].resource.name,
      ));
    }

    if (response.response.__typename === 'TextArea') {
      return (
        <div className="response-item">
          <div className="text-comment-heading">Suggestion</div>
          <div className="text-comment">
            {response.response.suggestion}
          </div>
        </div>
      );
    } else if (response.response.__typename === 'MissingItems') {
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
                  defaultChecked={(response.response.missingItems).includes(item)}
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
        <div className="cleanliness">{roomCleanlinessRating(response.response.rate)}</div>
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
  renderModalContent = () => {
    const { roomResources, roomResponse } = this.state;
    const { roomName, totalResponses, response } = roomResponse;
    const {
      totalCleanlinessRating,
      roomCleanlinessRating,
      totalMissingItemsCount,
      totalRoomResources,
    } = this.props;

    let totalRoomResourcesCount;

    if (roomResources) {
      totalRoomResourcesCount = totalRoomResources(roomResources);
    } else {
      totalRoomResourcesCount = 0;
    }

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
            <div>Missing Items</div>
            <div>Cleanliness</div>
          </div>
          <div className="row-1-data">
            <div>{`${totalMissingItems} out of ${totalRoomResourcesCount}`}</div>
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
        <div className="row-2">{this.roomFeedbackList(response, roomResources)}</div>
      </Fragment>
    );
  };

  render() {
    const { roomId } = this.props;
    return (!this.props.visible || !roomId ? null : (
      <div className="side-modal">
        {this.state.isFetching ? this.renderSpinner() : this.renderModalContent()}
      </div>
    ));
  }
}

SingleRoomFeedBack.propTypes = {
  roomCleanlinessRating: PropTypes.func.isRequired,
  totalCleanlinessRating: PropTypes.func.isRequired,
  totalMissingItemsCount: PropTypes.func.isRequired,
  totalRoomResources: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  roomId: PropTypes.number,
};

SingleRoomFeedBack.defaultProps = {
  showModal: PropTypes.func,
  roomId: null,
};

export default SingleRoomFeedBack;
