import React from 'react';
import PropTypes from 'prop-types';

// styles
import '../../assets/styles/button.scss';
import '../../assets/styles/officeStructure.scss';

/**
 * It renders a button
 *
 * @param {Object}
 *
 * @returns {JSX}
 */
const Button = ({
  title,
  classProp,
  handleClick,
  isDisabled,
  type,
  id,
}) => {
  const classname = `${classProp} ${type === 2 ? 'btn-secondary' : type === 3 ? 'onboarding-next-button' : 'btn-primary'}`;
  return (
    <button
      className={classname}
      onClick={handleClick}
      disabled={isDisabled}
      id={id}
    >
      <span>{title}</span>
    </button>
  );
};

Button.defaultProps = {
  classProp: null,
  handleClick: null,
  isDisabled: false,
  type: 1,
  id: 'Next',
};

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  classProp: PropTypes.string,
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  type: PropTypes.number,
  id: PropTypes.string,
};


export default Button;
