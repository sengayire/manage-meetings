/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import CheckboxSlide from '../commons/CheckboxSlide';
import EditFeedback from './EditFeedback';
import DeleteFeedback from './DeleteFeedback'; // eslint-disable-line
import UPDATE_QUESTION_MUTATION from '../../graphql/mutations/Question';

/**
 * Feedback Component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const Feedback = props =>
  props.feedback.map(
    (
      {
        id, question, startDate, endDate, questionResponseCount, questionType, isActive,
      },
      index,
    ) => (

      <div className="table__row" key={index}>
        <span>
          {question}
        </span>
        <span>{questionType}</span>
        <span>{questionResponseCount}</span>
        <span>{props.startDateFormatter(startDate)}</span>
        <span>{props.durationFormatter(startDate, endDate)}</span>
        <span>
          <EditFeedback
            id="edit-modal"
            question={question}
            type={questionType}
            startDate={startDate}
            duration={props.durationFormatter(startDate, endDate)}
          />
          <DeleteFeedback id={id} question={question} />
        </span>
        <span className="checkbox">
          <CheckboxSlide
            questionId={parseInt(id, 10)}
            checked={isActive}
            updateQuestion={props.updateQuestion}
          />
        </span>
      </div>
    ),
  );

Feedback.defaultProps = {
  feedback: [
    {
      question: 'There is no question so far',
      questionType: 'Input',
      startDate: '2019-02-21 23:42:43',
      endDate: '2019-02-21 23:42:43',
      questionResponseCount: 0,
      isActive: false,
    },
  ],
};

Feedback.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default graphql(UPDATE_QUESTION_MUTATION, { name: 'updateQuestion' })(Feedback);
