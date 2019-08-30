import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import '../../assets/styles/SingleRoomSideModel.scss';
import Spinner from '../commons/Spinner';
import { getRoomResources, getSingleRoomFeedback } from '../helpers/QueriesHelpers';
import resolveResponses from '../helpers/mutationHelpers/responses';
import '../../assets/styles/spinner.scss';
import formatDate from '../../utils/reformatDate';

export class SingleRoomFeedBack extends Component {
  state = {
    roomResources: [
      {
        room: [
          {
            quantity: 0,
            resource: {
              name: '',
              room: [{ name: '' }],
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
          id: 282,
          createdDate: '2019-06-25T10:40:23.818174',
          resolved: false,
          response: { __typename: 'Rate', rate: 5 },
        },
      ],
    },
    isFetching: false,
    isResolving: false,
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.roomId) {
      if (this.props.roomId !== prevProps.roomId) {
        await this.getResourceData();
        await this.getFeedbackData();
      }
      if (prevProps.responseIds !== this.props.responseIds) {
        await this.getResourceData();
        await this.getFeedbackData();
      }
    }
  };

  getFeedbackData = async () => {
    this.setState({ isFetching: true });
    try {
      const feedback = await getSingleRoomFeedback(this.props.roomId);
      feedback.response = feedback.response.filter(
        resp => this.props.responseIds.includes(resp.id),
      );
      feedback.totalResponses = this.props.responseIds.length;

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
      if (
        error &&
        error.message === 'GraphQL error: Room has no resource yet'
      ) {
        this.setState({ isFetching: false });
        return;
      }
      this.setState({ isFetching: false });
    }
  };

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
        <div key={response.id} className="response">
          <div className="date">{formatDate(response.createdDate)}</div>
          {this.renderRoomFeedback(response, roomResources)}
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
   * Marks a response as resolved or unresolved
   *
   * @param {integer} responseId - ID of response to be resolved or unresolved
   * @param {integer} roomId - ID of room containing response
   *
   */
  resolveResponse = async (responseId, roomId) => {
    this.setState({ isResolving: true });
    try {
      await resolveResponses(responseId, roomId);
      await this.getFeedbackData();

      this.setState({ isResolving: false });
    } catch (error) {
      this.setState({ isResolving: false });
    }
  };

  renderSpinner = () => (
    <div className="modal-spinner">
      <Spinner />
    </div>
  );

  renderToggle = (isStatus, onChange, isFetching) => (
    <Switch
      checked={isStatus}
      onChange={onChange}
      handleDiameter={30}
      offColor="#FF0000"
      onColor="#449C44"
      offHandleColor="#fff"
      onHandleColor="#fff"
      height={30}
      width={115}
      className="react-switch"
      id="small-radius-switch"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      uncheckedIcon={this.renderStatus('Unresolved', isFetching)}
      checkedIcon={this.renderStatus('Resolved', isFetching)}
    />
  );
  renderStatus = (status, isFetchingStatus) => {
    const className =
      status === 'Resolved' ? 'feedback-status-resolved' : 'feedback-status';
    return (
      <div className={className}>
        {isFetchingStatus ? <Spinner size="toggle" /> : status}
      </div>
    );
  };
  /**
   * Conditionally renders responses that are
   * either ratings, suggestions or checks
   *
   * @param {object} response
   *
   * @return {JSX}
   */
  renderRoomFeedback = (response, roomResources) => {
    const onFeedbackToggle = () => {
      this.resolveResponse(response.id, this.props.roomId);
    };

    const { roomCleanlinessRating } = this.props;
    let resourcesList;
    if (!roomResources) {
      resourcesList = [];
    } else {
      roomResources &&
        (resourcesList = roomResources.map(
          resource => resource.room[0].resource.name,
        ));
    }

    if (response.response.__typename === 'TextArea') {
      return (
        <div className="response-item">
          <div className="text-comment-heading">Suggestion</div>
          <div className="text-comment">
            {response.response.suggestion}
            <div className="resolved-status">
              {response.response.__typename === 'Rate' ? null : (
                <div className="btn-resolve">
                  {this.renderToggle(
                    response.resolved,
                    onFeedbackToggle,
                    this.state.isResolving,
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (response.response.__typename === 'MissingItems') {
      return (
        <div className="text-comment response-item">
          <div className="item-list">
            <div className="item-list-heading">Missing Items</div>
            <div />
            <div className="items">
              {resourcesList.map(item => (
                <label htmlFor={item} key={item}>
                  <input
                    id={response.id}
                    type="checkbox"
                    defaultChecked={Array.from(
                      response.response.missingItems,
                      x => x.name,
                    ).includes(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="resolved-status">
            {`Status: ${response.resolved ? 'Resolved' : 'Unresolved'}`}
          </div>
        </div>
      );
    }
    if (response.response.__typename === 'SelectedOptions') {
      return (
        <div className="response-item">
          <div className="text-comment-heading">Selected options</div>
          <div className="text-comment">
            {response.response.options}
            <div className="resolved-status">
              {`Status: ${response.resolved ? 'Resolved' : 'Unresolved'}`}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="text-comment item-list response-item">
        <div className="item-list-heading">Cleanliness</div>
        <div />
        <div className="cleanliness">
          {roomCleanlinessRating(response.response.rate)}
        </div>
      </div>
    );
  };

  /**
   * Conditionally renders a spinner, error message
   * or content
   *
   * @param {object} props
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
    const { averageRating, grade } = totalCleanlinessRating(response);
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
              {roomCleanlinessRating(averageRating)}
              <br />
              <div className="row-1-grade">{grade}</div>
            </div>
          </div>
        </div>
        <div className="row-2-heading">{totalResponses} Responses </div>
        <div className="row-2">
          {this.roomFeedbackList(response, roomResources)}
        </div>
      </Fragment>
    );
  };

  render() {
    const { roomId } = this.props;
    return !this.props.visible || !roomId ? null : (
      <div className="side-modal">
        {this.state.isFetching
          ? this.renderSpinner()
          : this.renderModalContent()}
      </div>
    );
  }
}

SingleRoomFeedBack.propTypes = {
  responseIds: PropTypes.arrayOf(PropTypes.number),
  roomCleanlinessRating: PropTypes.func.isRequired,
  totalCleanlinessRating: PropTypes.func.isRequired,
  totalMissingItemsCount: PropTypes.func.isRequired,
  totalRoomResources: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  roomId: PropTypes.number,
};

SingleRoomFeedBack.defaultProps = {
  responseIds: [],
  showModal: PropTypes.func,
  roomId: null,
};

export default SingleRoomFeedBack;
