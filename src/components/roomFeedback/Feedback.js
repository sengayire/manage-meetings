/* eslint react/no-array-index-key: 0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CheckBoxSlide from '../commons/CheckboxSlide';
import EditFeedbackComponent from './EditFeedback';
import { UPDATE_QUESTION_STATUS_MUTATION } from '../../graphql/mutations/Question';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../../src/graphql/queries/questions';
import DeleteFeedback from './DeleteFeedback'; // eslint-disable-line

/**
 * Feedback Component
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const Feedback = (props) => {
  const { role } = props;
  return (
    props.feedback.map(({
      id, question, startDate, endDate, questionTitle,
      questionResponseCount, questionType, isActive,
    }) => (
      <div className="table__row" key={id}>
        <span>
          {question}
        </span>
        <span>{questionType}</span>
        <span>{questionResponseCount}</span>
        <span>{props.startDateFormatter(startDate)}</span>
        <span>{props.durationFormatter(startDate, endDate)}</span>
        {
          role === '2' &&
          <Fragment>
            <span>
              {!isActive &&
                <EditFeedbackComponent
                  id="edit-modal"
                  questionId={id}
                  question={question}
                  questionType={questionType}
                  questionTitle={questionTitle}
                  startDate={startDate}
                  endDate={endDate}
                />}
              <DeleteFeedback id={id} question={question} />
            </span>
            <span className="checkbox">
              <CheckBoxSlide
                questionId={parseInt(id, 10)}
                isChecked={isActive}
                actionToPerform="mutation"
                mutationQuery={UPDATE_QUESTION_STATUS_MUTATION}
                updateQuery={GET_ROOM_FEEDBACK_QUESTIONS_QUERY}
              />
            </span>
          </Fragment>
        }
      </div>
    )));
};

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
  role: PropTypes.string.isRequired,
};

export default Feedback;
