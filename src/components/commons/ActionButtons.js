import React from 'react';
import PropTypes from 'prop-types';

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
  <div className="form-action-buttons">
    {props.withCancel && (
      <button
        className={props.cancelButtonClassName}
        onClick={props.onClickCancel}
      >
        {props.cancelButtonText}
      </button>
    )}
    <button className={props.actionButtonClassName} type="submit">
      {props.actionButtonText}
    </button>
  </div>
);

ActionButtons.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  withCancel: PropTypes.bool.isRequired,
  cancelButtonText: PropTypes.string,
  cancelButtonClassName: PropTypes.string,
  actionButtonText: PropTypes.string,
  actionButtonClassName: PropTypes.string,
};

ActionButtons.defaultProps = {
  cancelButtonText: 'CANCEL',
  actionButtonText: 'SAVE CHANGES',
  actionButtonClassName: 'action-button',
  cancelButtonClassName: 'cancel-button',
};

export default ActionButtons;
