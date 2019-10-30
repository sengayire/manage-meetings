import React from 'react';
import NumberInput from 'semantic-ui-react-numberinput';
import PropTypes from 'prop-types';
import '../../assets/styles/inputWithNumbers.scss';

const InputWithNumbers = ({ onChangeValue, inputValue }) => (
  <div className="number-input-container">
    <NumberInput
      value={inputValue}
      onChange={onChangeValue}
      buttonPlacement="right"
      className="number-input"
    />
  </div>
);

InputWithNumbers.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default InputWithNumbers;
