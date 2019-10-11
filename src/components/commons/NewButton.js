import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

// styles
import '../../assets/styles/button.scss';

/**
 * It renders a button
 *
 * @param {Object}
 *
 * @returns {JSX}
 */
const button = ({
  title,
  className,
  onClick,
  isDisabled,
  type,
  buttonId,
  ...props
}) => (
  <Button
    className={className}
    onClick={onClick}
    disabled={isDisabled}
    type={type}
    id={buttonId}
    {...props}
  >
    <span>{title}</span>
  </Button>
);

Button.defaultProps = {
  classProp: null,
  handleClick: null,
  isDisabled: false,
  type: 1,
};

button.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  isDisabled: PropTypes.bool,
  buttonId: PropTypes.string,
  type: PropTypes.string,
};

button.defaultProps = {
  title: 'title',
  type: 'button',
  onClick: e => e,
  className: 'radius-4 button yellow bold uppercase',
  color: '#000',
  buttonId: 'buttonId',
  isDisabled: false,
};

export default button;
