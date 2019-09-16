/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/multipleSelect.scss';
import { ChevronDown, ChevronUp, Check, X } from './SVGs';

class Select extends Component {
  state = {
    values: [],
    focusedValue: -1,
    isOpen: false,
    typed: '',
  }


  componentDidUpdate(prevProps, { values: oldValues }) {
    const { values: newValues } = this.state;
    const { handleSubmit } = this.props;
    if (newValues !== oldValues) {
      handleSubmit(newValues);
    }
  }

  onBlur = () => {
    const { options, multiple } = this.props;
    this.setState((prevState) => {
      const { values } = prevState;
      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false,
        };
      }
      const value = values[0];
      let focusedValue = -1;
      if (value) {
        focusedValue = options.findIndex(option => option.value === value);
      }
      return {
        focusedValue,
        isFocused: false,
        isOpen: false,
      };
    });
  }

  onKeyDown = (e) => {
    const { options, multiple } = this.props;
    const { isOpen } = this.state;
    switch (e.key) {
      case ' ':
        e.preventDefault();
        if (isOpen) {
          if (multiple) {
            this.setState((prevState) => {
              const { focusedValue } = prevState;
              if (focusedValue !== -1) {
                const [...values] = prevState.values;
                const { value } = options[focusedValue];
                const index = values.indexOf(value);

                if (index === -1) {
                  values.push(value);
                } else {
                  values.splice(index, 1);
                }
                return { values };
              }
              return false;
            });
          }
        } else {
          this.setState({
            isOpen: true,
          });
        }
        break;
      case 'Escape':
      case 'Tab':
        if (isOpen) {
          e.preventDefault();
          this.setState({
            isOpen: false,
          });
        }
        break;
      case 'Enter':
        this.setState(prevState => ({
          isOpen: !prevState.isOpen,
        }));
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.setState((prevState) => {
          let { focusedValue } = prevState;

          if (focusedValue < options.length - 1) {
            focusedValue += 1;

            if (multiple) {
              return {
                focusedValue,
              };
            }
            return {
              values: [options[focusedValue].value],
              focusedValue,
            };
          }
          return false;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.setState((prevState) => {
          let { focusedValue } = prevState;

          if (focusedValue > 0) {
            focusedValue -= 1;

            if (multiple) {
              return {
                focusedValue,
              };
            }
            return {
              values: [options[focusedValue].value],
              focusedValue,
            };
          }
          return false;
        });
        break;
      default:
        if (/^[a-z0-9]$/i.test(e.key)) {
          const char = e.key;

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.setState({
              typed: '',
            });
          }, 1000);

          this.setState((prevState) => {
            const typed = prevState.typed + char;
            const re = new RegExp(`^${typed}`, 'i');
            const index = options.findIndex(option => re.test(option.value));

            if (index === -1) {
              return {
                typed,
              };
            }

            if (multiple) {
              return {
                focusedValue: index,
                typed,
              };
            }
            return {
              values: [options[index].value],
              focusedValue: index,
              typed,
            };
          });
        }
        break;
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  onDeleteOption = (e) => {
    const { value } = e.currentTarget.dataset;

    this.setState((prevState) => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);

      values.splice(index, 1);

      return { values };
    });
  }

  onHoverOption = (e) => {
    const { options } = this.props;

    const { value } = e.currentTarget.dataset;
    const index = options.findIndex(option => option.value === value);

    this.setState({
      focusedValue: index,
    });
  }

  onClickOption = (e) => {
    const { multiple } = this.props;
    const { value } = e.currentTarget.dataset;
    this.setState((prevState) => {
      if (!multiple) {
        return {
          values: [value],
          isOpen: false,
        };
      }
      const [...values] = prevState.values;
      const index = values.indexOf(value);
      if (index === -1) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }
      return { values };
    });
  }

  stopPropagation = e => e.stopPropagation();

  renderValues = () => {
    const { placeholder, multiple, underScoreFormat } = this.props;
    const { values } = this.state;
    if (values.length === 0) {
      return (
        <div className="placeholder">
          { placeholder }
        </div>
      );
    }

    if (multiple) {
      return values.map(value => (
        <span
          key={value}
          onClick={this.stopPropagation}
          className="multiple value"
        >
          {
            underScoreFormat
              ? value.split('__').pop()
              : value
          }
          <span
            data-value={value}
            onClick={this.onDeleteOption}
            className="delete"
          >
            <X />
          </span>
        </span>
      ));
    }

    return (
      <div className="value">
        { values[0] }
      </div>
    );
  }

  renderOptions = () => {
    const { options } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }

    return (
      <div className="options">
        { options.map(this.renderOption) }
      </div>
    );
  }

  renderOption = (option, index) => {
    const { multiple, underScoreFormat, alreadyAssignedOptions } = this.props;
    const { values, focusedValue } = this.state;
    const { value } = option;
    const alreadyAssigned = alreadyAssignedOptions.includes(value);
    const selected = values.includes(value);
    let className = 'option';
    if (selected) className += ' selected';
    if (alreadyAssigned) className += ' alreadyAssigned';
    if (index === focusedValue) className += ' focused';

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={this.onHoverOption}
        onClick={(alreadyAssigned) ? null : this.onClickOption}
      >
        { multiple ?
          <span className="multiple-select__checkbox">
            { selected ? <Check /> : null }
            { alreadyAssigned ? <Check /> : null }
          </span> :
          null
        }
        {
          underScoreFormat
            ? value.split('__').pop()
            : value
        }
      </div>
    );
  }

  render() {
    const { label } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="multiple-select">
        <div
          className="select"
          tabIndex="0"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
        >
          <label className="label">{ label }</label>
          <div className="selection" onClick={this.onClick}>
            <div className="selection__selected-options">
              { this.renderValues() }
            </div>
            <span className="arrow">
              { isOpen ? <ChevronUp /> : <ChevronDown /> }
            </span>
          </div>
          { this.renderOptions() }
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  underScoreFormat: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  alreadyAssignedOptions: PropTypes.instanceOf(Array).isRequired,
};

Select.defaultProps = {
  underScoreFormat: false,
};

export default Select;
