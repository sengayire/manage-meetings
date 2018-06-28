import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/input.scss';

export const Input = ({
  name, value, inputClass, labelName, labelClass, id, onChange, ...otherProps
}) => (
  <div className={labelClass}>
    <label htmlFor={name}>{labelName}
      <input
        type="text"
        className={inputClass}
        name={name}
        defaultValue={value}
        onChange={onChange}
        id={id}
        {...otherProps}
      />
    </label>
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inputClass: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  labelClass: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
