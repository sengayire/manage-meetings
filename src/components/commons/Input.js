import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/input.scss';

export const Input = ({
  name, value, inputClass, type, labelName, labelClass, id, onChange, ...otherProps
}) => (
  <div className={labelClass}>
    <label htmlFor={name}>{labelName}
      <input
        type={type}
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
  inputClass: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  inputClass: 'mrm-input',
  labelClass: 'input1',
};

export default Input;
