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
      onChange={props.onChange}
      checked={props.checked}
    />
    <span className={`${props.checked && /* istanbul ignore next */ 'checked'} slider round`} />
  </label>
);

CheckboxSlide.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

CheckboxSlide.defaultProps = {
  checked: false,
  onChange: PropTypes.func,
};

export default CheckboxSlide;
