import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconDelete from '../../assets/images/delete.svg';
import IconEdit from '../../assets/images/edit.svg';

class IconButtons extends Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    modalButtonClassName: PropTypes.string,
    openModal: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    modalButtonClassName: 'button',
    disabled: false,
  };

  /**
   * Fires an event when the text on a reusable button changes
   *
   * @param {string} text
   *
   * @returns {string}
   */
  onButtonTextChange = (text) => {
    let buttonText;
    if (text === 'Delete') {
      buttonText = <img src={IconDelete} alt="Delete" />;
    } else if (text === 'Edit') {
      buttonText = <img src={IconEdit} alt="Edit" />;
    } else {
      buttonText = text;
    }
    return buttonText;
  };
  render() {
    const { buttonText, modalButtonClassName, disabled } = this.props;
    return (
      <button
        id="modal-button"
        className={modalButtonClassName}
        onClick={this.props.openModal}
        disabled={disabled}
      >
        {this.onButtonTextChange(buttonText)}
      </button>
    );
  }
}

export default IconButtons;
