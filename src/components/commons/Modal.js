import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../../assets/styles/modal.scss';
import IconButton from './IconButtons';
import { getItemFromLocalStorage } from '../../utils/Utilities';

const customStyles = {
  content: {
    fontFamily: 'DINPro-Regular',
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%',
    border: '1px solid #CCCCCC',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: '0 2px 40px 10px rgba(185, 180, 180, 0.2)',
    backgroundColor: '#ffffff',
    overflow: 'auto',
    // width: '614px',
  },
};

class MrmModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    handleCloseRequest: PropTypes.func.isRequired,
    closeModal: PropTypes.bool.isRequired,
    className: PropTypes.string,
    modalButtonClassName: PropTypes.string,
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    className: 'modalClass',
    modalButtonClassName: 'button',
    buttonText: '',
  };

  state = {
    modalIsOpen: false,
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {
      this.closeModal();
      this.props.handleCloseRequest();
    }
  };

  /**
   * Gets the snapshot before it updates the state
   *
   * @param {array} prevProps
   * @param {object} prevState
   *
   * @returns {Boolean}
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      !prevProps.closeModal &&
      prevState.modalIsOpen &&
      this.props.closeModal
    ) {
      return true;
    }
    return null;
  }

  /**
   * Allows opening of modal
   *
   * @returns {void}
   */
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  /**
   * Changes the subtitle color after
   * successfully opening the modal
   *
   * @returns {void}
   */
  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  };

  /**
   * Allows closing of modal
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {
      buttonText,
      className,
      title,
      children,
      modalButtonClassName,
    } = this.props;
    const access = getItemFromLocalStorage('access');

    return (
      <Fragment>
        <IconButton
          buttonText={buttonText}
          modalButtonClassName={modalButtonClassName}
          openModal={this.openModal}
          disabled={parseInt(access, 10) === 1}
        />
        <Modal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Parent Modal"
          className={className}
          ariaHideApp={false}
        >
          <h2
            ref={(subtitle) => {
              this.subtitle = subtitle;
            }}
          >
            {title}
          </h2>
          {children}
        </Modal>
      </Fragment>
    );
  }
}

export default MrmModal;
