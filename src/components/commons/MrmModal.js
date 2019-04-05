/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButtons';
import IconButtons from './IconButtons';
import { getUserDetails } from '../helpers/QueriesHelpers';
import '../../assets/styles/mrmmodal.scss';

class MrmModal extends Component {
  static propTypes = {
    modalContent: PropTypes.node,
    title: PropTypes.string,
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.number,
    withButton: PropTypes.bool,
    styleClassName: PropTypes.string,
  };

  static defaultProps = {
    modalContent: '',
    buttonText: '',
    title: '',
    type: 1,
    withButton: true,
    styleClassName: '',
  };

  state = {
    isOpen: false,
    role: '',
  };

  componentDidMount() {
    this.props.withButton && this.setUserRole();
  }

  /**
   * Sets the role of the current user
   * @returns {void}
   */
  setUserRole = async () => {
    const user = await getUserDetails();
    this.setState({ role: user.roles[0].id });
  };

  /**
   * Toggle the visibility of the modal
   *
   * @returns {void}
   */
  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.handleCloseModal();
  };

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
      withButton,
      styleClassName,
    } = this.props;
    return (
      <div className="modal-component">
        { type === 1 &&
          this.state.role === '2' &&
          <IconButtons
            buttonText={buttonText}
            openModal={this.toggleModal}
            classProp={iconButtonClass}
          />
          }
        {this.state.isOpen &&
          <div className="modal">
            <div className="overlay" />
            <div className={`modal_content ${styleClassName}`}>
              <h2>{title}</h2>
              {modalContent}
              {withButton && (
                <ActionButton
                  cancelButtonText={cancelButtonText}
                  actionButtonText={actionButtonText}
                  onClickSubmit={handleSubmit}
                  onClickCancel={this.toggleModal}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default MrmModal;
