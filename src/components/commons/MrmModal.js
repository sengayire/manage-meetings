/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButtons';
import IconButtons from './IconButtons';
import '../../assets/styles/mrmmodal.scss';

class MrmModal extends Component {
  static propTypes = {
    modalContent: PropTypes.node,
    title: PropTypes.string,
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.number,
  };

  static defaultProps = {
    modalContent: '',
    buttonText: '',
    title: '',
    type: 1,
  };

  state = {
    isOpen: false,
  }

  /**
   * Toggle the visibility of the modal
   *
   * @returns {void}
   */
  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      actionButtonText,
      handleSubmit,
      cancelButtonText,
      buttonText,
      title,
      type,
      modalContent,
      isLoading,
      iconButtonClass,
    } = this.props;
    return (
      <div className="modal-component">
        { type === 1 &&
        <IconButtons
          buttonText={buttonText}
          openModal={this.toggleModal}
          classProp={iconButtonClass}

        />
    }
        {this.state.isOpen &&
          <div className="modal">
            <div className="overlay" />
            <div className="modal_content">
              <h2>{title}</h2>
              {modalContent}
              <ActionButton
                cancelButtonText={cancelButtonText}
                actionButtonText={actionButtonText}
                onClickSubmit={handleSubmit}
                onClickCancel={this.toggleModal}
                isLoading={isLoading}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default MrmModal;
