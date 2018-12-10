/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from './commons/slider';

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
      <td>{question}</td>
      <td>{type}</td>
      <td>{responses}</td>
      <td>{startDate}</td>
      <td>{duration}</td>
      <td>
        <img src="/1982b0427a5a73aeffde1f16255b4f8f.svg" alt="Edit" />
        <img src="/d34784bf1f4cacf5f9970140c723e361.svg" alt="Delete" />
      </td>
      <td><Slider checked={status} /></td>
    </tr>
  ))
);

Feedback.propTypes = {
  feedback: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feedback;
