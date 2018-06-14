import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../../assets/styles/modal.scss';

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
    padding: '20px',
    border: '1px solid #CCCCCC',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: '0 2px 40px 10px rgba(185, 180, 180, 0.2)',
    backgroundColor: '#ffffff',
    overflow: 'auto',
  },
};

class MrmModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    handleCloseRequest: PropTypes.func.isRequired,
    closeModal: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'modalClass',
    buttonText: '',
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.openModal && !state.modalIsOpen) return { modalIsOpen: true };
    return null;
  }

  state = {
    modalIsOpen: false,
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {
      this.closeModal();
      this.props.handleCloseRequest();
    }
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (!prevProps.closeModal && prevState.modalIsOpen && this.props.closeModal) {
      return true;
    }
    return null;
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {
      buttonText, className, title, children,
    } = this.props;
    return (
      <Fragment>
        {buttonText && (
          <button id="modal-button" onClick={this.openModal}>{buttonText}</button>
        )}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Parent Modal"
          className={className}
          ariaHideApp={false}
        >
          <h2 ref={(subtitle) => { this.subtitle = subtitle; }}>{title}</h2>
          {children}
        </Modal>
      </Fragment>
    );
  }
}

export default MrmModal;
