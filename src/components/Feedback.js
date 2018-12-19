/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ROUTES from '../utils/routes';
import CheckboxSlide from './commons/CheckboxSlide';
import EditFeedback from './EditFeedback';
import DeleteFeedback from './DeleteFeedback';

/* istanbul ignore next */
const onChange = () => {};

const Feedback = props => (
  props.feedback.map(({
    question,
    startDate,
    duration,
    responses,
    type,
    status,
  }, index) => (
    <tr key={index}>
      <td><NavLink to={ROUTES.roomResponses}>{question}</NavLink></td>
      <td>{type}</td>
      <td>{responses}</td>
      <td>{startDate}</td>
      <td>{duration}</td>
      <td>
        <EditFeedback
          id="edit-modal"
          question={question}
          type={type}
          startDate={startDate}
          duration={duration}
        />
        <DeleteFeedback id="delete-modal" question={question} />
      </td>
      <td><CheckboxSlide checked={status} onChange={onChange} /></td>
    </tr>
  ))
);

Feedback.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feedback;
