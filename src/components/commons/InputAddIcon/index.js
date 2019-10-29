import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import SingleInputWithAddIcon from './InputWithPlusIcon';

class InputsWithAddIcons extends Component {
  state = {
    inputs: 1,
    errors: {
      building_name_1: '',
    },
    values: {
      building_name_1: '',
    },
  };


  onAddInput = async (key, forcedValue) => {
    const stateValues = {};
    this.setState(state => ({
      inputs: parseInt(forcedValue, 10) || state.inputs + 1,
      values: {
        ...state.values,
        [`building_name_${parseInt(key, 10) + 1}`]: '',
      },
    }));

    await _.map(this.state.values, (value, title) => {
      if (parseInt(title.split('_')[2], 10) <= parseInt(forcedValue || key, 10)) {
        stateValues[title] = value;
      }
    });
    if (!_.isEmpty(stateValues)) {
      this.setState({
        values: {
          ...stateValues,
        },
      });
    }
  }
  buildingSchema = name => ({
    [name]: Joi.string().trim().min(2).required()
      .label('the building name'),
  })

  handleTextChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const buildings = { [name]: value };
    const { error } = Joi.validate(buildings, this.buildingSchema(name));

    if (error) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: error.details[0].message,
        },
      }));
    } else {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: '',
        },
      }));
    }

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
    }));
  }

  render() {
    const { inputs, values, errors } = this.state;
    return (
      <Fragment>
        {Array.from({ length: inputs }, (input, index) => (
          <SingleInputWithAddIcon
            key={index}
            pressed={() => { this.onAddInput(inputs); }}
            name={`building_name_${index + 1}`}
            onTextChange={e => this.handleTextChange(e, index)}
            values={values}
            errors={errors}
          />
        ))}
      </Fragment>
    );
  }
}
export default InputsWithAddIcons;
