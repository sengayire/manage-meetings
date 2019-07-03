import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/select-input.scss';
/**
 * Reusable Image Selector Input Field
 *
 * @param {Object} selectInputObject
 *
 * @returns {JSX}
 */
const SelectInput = ({
  wrapperClassName,
  id,
  labelText,
  name,
  isValue,
  selectInputClassName,
  value,
  onChange,
  onClick,
  placeholder,
  options,
  children,
  placeholderValue,
  required,
  dynamicValue,
  ...otherProps
}) => (
  <div className={wrapperClassName}>
    <label htmlFor={id}>
      {labelText}
      <form id="LocationFilters">
        <select
          name={name}
          id={id}
          className={selectInputClassName}
          defaultValue={value}
          onChange={event => onChange(event)}
          {...otherProps}
          required={required}
          value={dynamicValue}
        >
          {/* render place holder in case its provided */}
          {placeholder && <option value={placeholderValue}>{placeholder} </option>}

          {/* Render the array options if provided.
         If you provide both options and children, details in the options will be rendered
        */}
          {
            options
            && options.length
            &&
            options.map((option) => {
              const props = {
                value: isValue ? (option.name || option) : (option.id || option.structureId),
                structure: (option.structureId),
                key: option.name || option.structureId || option.id || option.calendarId || option,
              };
              return (
                <option
                  {...props}
                >
                  {option.name || option}
                </option>
              );
            })
          }
          {/*
        render children if they are provided,
        the children of the select element should be <option tags>
        for example
            <Select>
                <option value="Hello">Hello From the Other Side</option>
            <Select/>
        */}
          {children && !options && children}

          {/* warn user that he needs to atleast provide options or children */}
          {!options &&
            !children &&
            'You need to provide atleast children or options to the select element'}
        </select>
      </form>
    </label>
  </div>
);

SelectInput.propTypes = {
  dynamicValue: PropTypes.string,
  selected: PropTypes.number,
  name: PropTypes.string.isRequired,
  isValue: PropTypes.bool,
  id: PropTypes.string.isRequired,
  selectInputClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholderValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }), PropTypes.string]),
  ),
  children: PropTypes.node,
};

SelectInput.defaultProps = {
  dynamicValue: undefined,
  selected: -1,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isValue: false,
  selectInputClassName: 'default-select',
  wrapperClassName: 'input1',
  placeholder: '',
  placeholderValue: '',
  options: null,
  children: null,
  value: undefined,
  required: false,
  labelText: '',
};

export default SelectInput;
