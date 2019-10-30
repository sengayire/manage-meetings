import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import { Input, Popup, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../assets/styles/inputField.scss';

class InputField extends Component {
  state = {
    inputValue: '',
    errors: {
      center_name: '',
    },
  }


  schema = {
    center_name: Joi.string().trim().min(2).required()
      .label('the center name'),
  }

  handleTextChange = ({ currentTarget }) => {
    const { handleChange } = this.props;
    const { name, value } = currentTarget;
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, this.schema);

    if (error) {
      this.setState({
        errors: { center_name: error.details[0].message },
      });
    } else {
      this.setState({
        errors: {
          center_name: '',
        },
      });
    }
    handleChange(value);
    return this.setState({
      inputValue: value,
    });
  }
  render() {
    const { placeholder } = this.props;
    const { inputValue, errors } = this.state;
    return (
      <div className="input-field-container">
        <Input
          error={!!errors.center_name}
          placeholder={placeholder}
          className="input-field-style"
          value={inputValue}
          name="center_name"
          onChange={this.handleTextChange}
          onBlur={this.handleTextChange}
        />

        { errors.center_name &&
        <Fragment>
          <br />
          <span className="error-area-style">
            {errors.center_name}
          </span>
        </Fragment>
        }
        <br />
        <Popup
          content="Enter your andela center"
          trigger={<Icon name="info circle" color="blue" size="medium" fitted />}
          position="right center"
          className="input-field-popup-icon"
        />
      </div>
    );
  }
}

InputField.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

InputField.defaultProps = {
  placeholder: 'eg Epic Campus',
  handleChange: () => {},
};

export default InputField;
