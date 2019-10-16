import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../commons/Modal';
import Button from '../commons/Button';
import hideIcon from '../../assets/images/hide-icon.svg';
import '../../assets/styles/loginModal.scss';

const { ANDELA_LOGIN_URL, MRM_URL } = process.env || {};

const LoginModal = ({ openModal, closeModal, handleCloseModal }) => (
  <Modal
    showBtn={false}
    className="login-modal"
    handleCloseRequest={handleCloseModal}
    closeModal={closeModal}
    openModal={openModal}
  >
    <button className="hide-model-btn" onClick={handleCloseModal} >
      <img src={hideIcon} alt="hide modal" />
    </button>
    <p className="title">Welcome.</p>
    <p className="description">
      We see it’s your first time here <span role="img" aria-label="emoji">😉</span><br />
      With Converge you can easily book your meeting <br />
      rooms & check-in to meetings.
    </p>
    <a className="login-btn-link" href={`${ANDELA_LOGIN_URL}=${MRM_URL}`}>
      <Button classProp="login-btn" title="Login To Get Started" />
    </a>
  </Modal>
);

LoginModal.propTypes = {
  openModal: PropTypes.bool,
  closeModal: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
};

LoginModal.defaultProps = {
  openModal: false,
  closeModal: true,
};

export default LoginModal;
