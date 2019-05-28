/* eslint-disable no-underscore-dangle */
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
    btnImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.number,
    withButton: PropTypes.bool,
    styleClassName: PropTypes.string,
    handleCloseModal: PropTypes.func,
    showActionButton: PropTypes.bool,
  };

  static defaultProps = {
    modalContent: '',
    buttonText: '',
    title: '',
    btnImage: '',
    type: 1,
    withButton: true,
    styleClassName: '',
    handleCloseModal: () => {},
    showActionButton: true,
  };

  state = {
    isOpen: false,
    role: '',
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.withButton && this.setUserRole();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  /**
   * Sets the role of the current user
   * @returns {void}
   */
  setUserRole = async () => {
    const user = await getUserDetails();
    this._isMounted && this.setState({ role: user.roles[0].id });
  };

  _isMounted = false;
  /**
   * Toggle the visibility of the modal
   *
   * @returns {void}
   */
  toggleModal = () => {
    this.setState(({ isOpen }) => {
      if (isOpen) this.props.handleCloseModal();
      return { isOpen: !this.state.isOpen };
    });
  };

  toggleModalByRef = () => {
    this._isMounted && this.setState({ isOpen: !this.state.isOpen }, () => {});
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
      showActionButton,
      btnImage,
    } = this.props;
    return (
      <div className="modal-component">
        {type === 1 &&
          this.state.role === '2' && (
            <IconButtons
              btnImage={btnImage}
              buttonText={buttonText}
              openModal={this.toggleModal}
              modalButtonClassName={iconButtonClass}
            />
          )}
        {this.state.isOpen && (
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
                  showActionButton={showActionButton}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MrmModal;
