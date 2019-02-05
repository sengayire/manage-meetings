/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import CheckboxSlide from '../commons/CheckboxSlide';
import EditFeedback from './EditFeedback';
import DeleteFeedback from './DeleteFeedback';

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
        question,
        startDate,
        endDate,
        questionResponseCount,
        questionType,
        isActive,
      },
      index,
    ) => (
      <tr key={index}>
        <td>
          <NavLink to={ROUTES.roomResponses} className="questions">
            {question}
          </NavLink>
        </td>
        <td>{questionType}</td>
        <td>{questionResponseCount}</td>
        <td>{props.startDateFormatter(startDate)}</td>
        <td>{props.durationFormatter(startDate, endDate)}</td>
        <td>
          <EditFeedback
            id="edit-modal"
            question={question}
            type={questionType}
            startDate={startDate}
            duration={props.durationFormatter(startDate, endDate)}
          />
          <DeleteFeedback id="delete-modal" question={question} />
        </td>
        <td>
          <CheckboxSlide checked={isActive} onChange={props.onChange} />
        </td>
      </tr>
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

export default Feedback;
