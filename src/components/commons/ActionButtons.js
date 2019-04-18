import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Button from '../commons/Button';

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
  props.isLoading
    ? <Spinner size="small" /> :
    <div className="form-action-buttons">
      <Button handleClick={props.onClickCancel} title={props.cancelButtonText} />
      { props.showActionButton &&
      <Button type={2} handleClick={props.onClickSubmit} title={props.actionButtonText} classProp="main-button" />
      }
    </div>
);

ActionButtons.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string,
  actionButtonText: PropTypes.string,
  isLoading: PropTypes.bool,
  onClickSubmit: PropTypes.func,
  showActionButton: PropTypes.bool,
};

ActionButtons.defaultProps = {
  onClickSubmit: PropTypes.func,
  cancelButtonText: 'CANCEL',
  actionButtonText: 'SAVE CHANGES',
  isLoading: false,
  showActionButton: true,
};

export default ActionButtons;
