import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/input.scss';
import Controls from '../helpers/Controls';

export class Input extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  clear = () => {
    this.inputRef.current.value = 0;
  };

  /**
   * Increases and decreases numeric input value
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleIncrement = (event) => {
    const { onChange } = this.props;
    event.preventDefault();

    /* Logic for increasing and decreasing numeric input value
     * should be placed here.
     */

    const num = parseInt(this.inputRef.current.value, 10);
    if (event.target.name === 'up') {
      /* The button up event and Incremented number is passed
       * to the onChange function when the up button is
       * pressed.
       */
      onChange(event, num + 1);
      this.inputRef.current.value = num + 1;
    }
    if (event.target.name === 'down') {
      if (num >= 1) {
        onChange(event, num - 1);
        this.inputRef.current.value = num - 1;
      }
    }
  };

  render() {
    const {
      name,
      value,
      inputClass,
      type,
      labelName,
      labelClass,
      id,
      placeholder,
      onChange,
      controlsClass,
      ...otherProps
    } = this.props;

    return (
      <div className={labelClass}>
        <label htmlFor={name}>
          {labelName}
          <input
            ref={this.inputRef}
            type={type}
            className={inputClass}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            {...otherProps}
          />

          {type === 'number' ? (
            <Controls
              controlsClass={controlsClass}
              handleIncrement={this.handleIncrement}
            />
          ) : null}
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputClass: PropTypes.string,
  controlsClass: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

Input.defaultProps = {
  value: 'text',
  type: 'text',
  inputClass: 'mrm-input default-input',
  labelClass: 'input1',
  controlsClass: '',
  placeholder: '',
};

export default Input;
