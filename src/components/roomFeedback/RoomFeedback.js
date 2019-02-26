import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import TableHead from '../helpers/TableHead';
import Feedback from './Feedback';
import { GET_USER_ROLE } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import { saveItemInLocalStorage } from '../../utils/Utilities';
import '../../../src/assets/styles/roomFeedback.scss';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../../src/graphql/queries/questions';
import Spinner from '../commons/Spinner';

/**
 * Component for Room Feedback
 *
 * @returns {JSX}
 */
export class RoomFeedback extends Component {
  state = {
    allQuestions: [],
  };

  componentWillMount() {
    this.setAllQuestionsToState(this.props);
  }

  componentWillReceiveProps(props) {
    const { user } = props.user;
    if (user) saveItemInLocalStorage('access', user.roles[0].id);
    this.setAllQuestionsToState(props);
  }

  /**
   * updates the state whenever the RoomFeedback component receives the props
   * and also whenever the RoomFeedback component mounts
   *
   * @param {object} props
   *
   * @returns {void}
   */
  setAllQuestionsToState = (props) => {
    const { allQuestions } = props.data;
    this.setState({
      allQuestions,
    });
  };

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
    const { allQuestions } = this.state;
    const { loading } = this.props.data;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div className="room-feedback">
        <div className="room-feedback__list">
          <div className="table">
            <TableHead
              titles={[
                'Question',
                'Type',
                'Responses',
                'Start Date',
                'Duration',
                'Action',
                'Status',
              ]}
            />
            <div className="table__body">
              {
                <Feedback
                  feedback={allQuestions}
                  durationFormatter={this.durationInWeeks}
                  startDateFormatter={this.formatStartDate}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoomFeedback.defaultProps = {
  data: {
    allQuestions: [
      {},
    ],
    loading: false,
    error: {},
    refetch: null,
  },
};

RoomFeedback.propTypes = {
  data: PropTypes.shape({
    allQuestions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    refetch: PropTypes.func,
  }),
  user: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
export default compose(
  graphql(GET_USER_ROLE, {
    name: 'user',
    options: /* istanbul ignore next */ () => ({
      variables: {
        email: process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email,
      },
    }),
  }),
  graphql(GET_ROOM_FEEDBACK_QUESTIONS_QUERY),
)(RoomFeedback);
