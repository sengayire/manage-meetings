import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/select-input.scss';

const SelectInput = ({
  wrapperClassName,
  id,
  labelText,
  name,
  selectInputClassName,
  value,
  onChange,
  placeholder,
  options,
  children,
  ...otherProps
}) => (
  <div className={wrapperClassName}>
    <label htmlFor={id}>
      {labelText}
      <select
        name={name}
        id={id}
        className={selectInputClassName}
        value={value}
        onChange={onChange}
        {...otherProps}
      >
        {/* render place holder in case its provided */}
        {placeholder && <option value="">{placeholder}</option>}

        {/* Render the array options if provided.
         If you provide both options and children, details in the options will be rendered
        */}
        {options &&
          options.length &&
          options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayText || option.value}
            </option>
          ))}

        {/*
        render children if they are provided,
        the children of the select element should be <option tags>
        for example
            <Select>
                <option value="Hello">Hello From the Other Side</option>
            <Select/>
        */}
        { children && !options && children}

        {/* warn user that he needs to atleast provide options or children */}
        {!options &&
          !children &&
          ('You need to provide atleast children or options to the select element')}
      </select>
    </label>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selectInputClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    displayText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  children: PropTypes.node,
};

SelectInput.defaultProps = {
  selectInputClassName: 'default-select',
  wrapperClassName: 'input1',
  placeholder: '',
  options: null,
  children: null,
};

export default SelectInput;
