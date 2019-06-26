import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHead from '../helpers/TableHead';
import Feedback from './Feedback';
import '../../../src/assets/styles/roomFeedback.scss';
import ErrorIcon from '../../components/commons/ErrorIcon';
import dummyQuestions from '../../fixtures/roomFeedbackQuestions';
import Overlay from '../commons/Overlay';

/**
 * Component for Room Feedback
 *
 * @returns {JSX}
 */
export class RoomFeedback extends Component {
  /**
   * This function computes the duration in weeks
   * basing on the start and end dates
   *
   * @param {date} startDate
   * @param {date} endDate
   *
   * @returns {string}
   */
  durationInWeeks = (startDate, endDate) => {
    const oneDayInMiliSeconds = 1000 * 60 * 60 * 24;
    const startDateInMiliSeconds = parseInt(new Date(startDate).getTime(), 10);
    const endDateInMiliSeconds = parseInt(new Date(endDate).getTime(), 10);
    const differenceInMiliSeconds = parseInt(
      Math.abs(startDateInMiliSeconds - endDateInMiliSeconds),
      10,
    );
    const numberOfDays = differenceInMiliSeconds / oneDayInMiliSeconds;
    if (Math.round(numberOfDays / 7) < 1) {
      if (Math.round(numberOfDays <= 1)) {
        return `${Math.round(numberOfDays)} Day`;
      }
      return `${Math.round(numberOfDays)} Days`;
    }
    if (Math.round(numberOfDays / 7) === 1) {
      return '1 Week';
    }
    return `${Math.round(numberOfDays / 7)} Weeks`;
  };

  /**
   * This function formats the returned date
   *
   * @param {date} startDate
   *
   * @returns {string}
   */
  formatStartDate = (startDate) => {
    const theDate = new Date(startDate).getDate();
    const theMonth = new Date(startDate).toLocaleString(
      'en-us',
      {
        month: 'short',
      },
    );
    const theYear = new Date(startDate).getFullYear();
    const finalDate = `${theDate} ${theMonth}, ${theYear}`;
    return finalDate;
  };

  render() {
    const {
      questions,
      loading,
      refetch,
      user: { roles: [{ id: role }] },
    } = this.props;
    let tableTitles = ['Question', 'Type', 'Responses', 'Start Date', 'Duration'];
    role === '2' && (tableTitles = [...tableTitles, 'Action', 'Status']);


    return (
      <div className="room-feedback">
        <div className="room-feedback__list">
          <div className="table">
            {!questions.length ? (
              <div className="item-list-empty">
                <ErrorIcon message="No questions at the moment" />
              </div>
            ) :
              <TableHead
                titles={[...tableTitles]}
              />}
            <div className="table__body overlay-container">
              {loading && <Overlay id="feedback_overlay" /> }
              <Feedback
                refetch={refetch}
                feedback={questions}
                durationFormatter={this.durationInWeeks}
                startDateFormatter={this.formatStartDate}
                role={role || '1'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoomFeedback.propTypes = {
  refetch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    roles: PropTypes.instanceOf(Array),
  }),
  questions: PropTypes.instanceOf(Array),
  loading: PropTypes.bool.isRequired,
};

RoomFeedback.defaultProps = {
  user: { roles: [{ id: '1' }] },
  questions: dummyQuestions,
};

export default RoomFeedback;
