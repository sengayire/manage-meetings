import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/checkboxSlide.scss';

/**
 * Builds reusable component for checkboxes
 *
 * @param {array} props
 *
 * @returns {JSX}
 */
const CheckboxSlide = props => (
  <label className="switch" htmlFor="CheckboxSlide">
    <input
      type="checkbox"
      className="checkbox"
      checked={props.checked}
      onChange={props.onChange}
    />
    <span className={`${props.checked && 'checked'} slider round`} />
  </label>
);

CheckboxSlide.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CheckboxSlide.defaultProps = {
  checked: false,
};

export default CheckboxSlide;
