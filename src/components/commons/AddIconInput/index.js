import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import SingleInputWithAddIcon from './InputWithPlusIcon';

class InputsWithAddIcons extends Component {
  constructor(props) {
    super(props);
    this.textInputs = [
      <SingleInputWithAddIcon
        pressed={() => {
          this.onAddInput();
        }}
        onInputChange={props.onInputChange}
        id={uuid()}
      />,
    ];
    this.state = {
      displayInputs: this.textInputs,
    };
  }

  onAddInput = () => {
    this.textInputs.push(
      <SingleInputWithAddIcon
        pressed={() => {
          this.onAddInput();
        }}
        onInputChange={this.props.onInputChange}
        id={uuid()}
      />,
    );
    this.setState({
      displayInputs: this.textInputs,
    });
  };

  render() {
    const { displayInputs } = this.state;
    return <Fragment>{displayInputs}</Fragment>;
  }
}

InputsWithAddIcons.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};
export default InputsWithAddIcons;
