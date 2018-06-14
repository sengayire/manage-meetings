import React from 'react';
import loginButton from '../../assets/images/Button.png';

const LoginButton = () => {
  // get urls from the .env file
  const { ANDELA_LOGIN_URL, MRM_URL } = process.env || {};

  return (
    <a href={`${ANDELA_LOGIN_URL}=${MRM_URL}`}>
      <input
        type="image"
        src={loginButton}
        alt="Login With Your Email"
        className="btn-signin"
      />
    </a>);
};

export default LoginButton;

