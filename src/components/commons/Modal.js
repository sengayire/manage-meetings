import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../../assets/styles/modal.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class MrmModal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    handleCloseRequest: PropTypes.func.isRequired,
    closeModal: PropTypes.bool.isRequired,
  }

  state = {
    modalIsOpen: false,
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {
      this.closeModal();
      this.props.handleCloseRequest();
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (!prevProps.closeModal && prevState.modalIsOpen && this.props.closeModal) { return true; }
    return null;
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }


  render() {
    return (
      <React.Fragment>
        <button id="modal-button" onClick={this.openModal}>{this.props.buttonText}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Parent Modal"
          className="modalClass"
          ariaHideApp={false}
        >
          <h2 ref={(subtitle) => { this.subtitle = subtitle; }}>{this.props.title}</h2>
          {this.props.children}
        </Modal>
      </React.Fragment>
    );
  }
}

export default MrmModal;
