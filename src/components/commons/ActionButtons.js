import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../commons/Spinner';

import '../../assets/styles/actionbuttons.scss';

/**
 * Reusable button component for performing
 * actions and canceling
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const ActionButtons = props => (
  props.isLoading ? <Spinner size="small" /> :
  <div className="form-action-buttons">
    <button className="cancel-button action-button" onClick={props.onClickCancel}>
      {props.cancelButtonText}
    </button>
    <button className="action-button" onClick={props.onClickSubmit}>
      {props.actionButtonText}
    </button>
  </div>

);

ActionButtons.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string,
  actionButtonText: PropTypes.string,
  isLoading: PropTypes.bool,
  onClickSubmit: PropTypes.func,
};

ActionButtons.defaultProps = {
  cancelButtonText: 'CANCEL',
  actionButtonText: 'SAVE CHANGES',
  isLoading: false,
  onClickSubmit: PropTypes.func,
};

export default ActionButtons;
