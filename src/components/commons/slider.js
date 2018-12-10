import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/slider.scss';

const Slider = props => (
  <label className="switch" htmlFor="slider">
    <input
      type="checkbox"
      className="checkbox"
      checked={props.checked}
      onChange={() => {}}
    />
    <span className={`${props.checked && 'checked'} slider round`} />
  </label>
);

Slider.propTypes = {
  checked: PropTypes.bool,
};

Slider.defaultProps = {
  checked: false,
};

export default Slider;
