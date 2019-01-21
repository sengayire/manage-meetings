import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/SingelRoomSideModel.scss';
import greenStar from '../../assets/images/green_star.svg';
import greyStar from '../../assets/images/grey_star.svg';

class SingleRoomFeedBack extends Component {
  state = {};

  /**
   * Loops through the room cleanliness
   * ratings and determines how to render
   * the green and grey Stars.
   *
   * @return {JSX}
   */
  roomCleanlinessRating = () => {
    const { rooms, roomId } = this.props;
    let rated = rooms[roomId].cleanliness;
    const data = [];
    while (rated > 0) {
      data.push(<img key={rated} src={greenStar} alt="" />);
      rated -= 1;
    }
    let unRated = 5 - rooms[roomId].cleanliness;
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
   * @return {JSX}
   */
  roomFeedbackList = () => {
    const { rooms, roomId } = this.props;
    const data = rooms[roomId].responses.map(response => (
      <div key={response.id} className="response">
        <div className="date">{response.date}</div>
        <div className="text-comment">{response.response}</div>
        <div className="item-list">
          <div className="item-list-heading">Missing Items</div>
          <div className="item-list-heading">Cleanliness</div>
          <div className="items">
            {rooms[roomId].items.map(item => (
              <label htmlFor={item.name} key={item.id}>
                <input
                  id={item.name}
                  type="checkbox"
                  defaultChecked={!!item.missing}
                />
                {item.name}
              </label>
            ))}
          </div>
          <div className="cleanliness">{this.roomCleanlinessRating()}</div>
        </div>
      </div>
    ));
    return data;
  };

  render() {
    const { rooms, roomId } = this.props;

    return !this.props.visible || !roomId ? null : (
      <div className="modal-wrapper">
        <div className="modal-header">
          {rooms[roomId].name}
          {/* eslint-disable-next-line */}
          <a href="/" className="cancel" onClick={this.props.showModal} />
        </div>
        <div className="row-1">
          <div className="row-1-headings">
            <div>Missing Tools</div>
            <div>Cleanliness</div>
          </div>
          <div className="row-1-data">
            <div>0 out of 5</div>
            <div>
              {this.roomCleanlinessRating()}
              <br />
              {rooms[roomId].response}
            </div>
          </div>
        </div>
        <div className="row-2-heading">
          {rooms[roomId].responses.length} Responses
        </div>
        <div className="row-2">{this.roomFeedbackList()}</div>
      </div>
    );
  }
}

SingleRoomFeedBack.propTypes = {
  rooms: PropTypes.instanceOf(Object),
  visible: PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  roomId: PropTypes.number,
};

SingleRoomFeedBack.defaultProps = {
  roomId: null,
  rooms: {},
  showModal: PropTypes.func,
};

export default SingleRoomFeedBack;
