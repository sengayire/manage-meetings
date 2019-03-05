import React from 'react';
import { loginButtonIcon } from '../../utils/images/images';

/**
 * Login Button component
 *
 * @returns {JSX}
 */
const LoginButton = () => {
  // get urls from the .env file
  const { ANDELA_LOGIN_URL, MRM_URL } = process.env || {};

  return (
    <a href={`${ANDELA_LOGIN_URL}=${MRM_URL}`}>
      <input
        type="image"
        src={loginButtonIcon}
        alt="Login With Your Email"
        className="btn-signin"
      />
    </a>
  );
};

export default LoginButton;
