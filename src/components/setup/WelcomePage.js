import React from 'react';
import PropTypes from 'prop-types';
import { welcomeImage } from '../../utils/images/images';
import Button from '../commons/Button';
import ImageLoader from '../commons/ImageLoader';

function WelcomePage({ handleClick, user }) {
  return (
    <div className="setup_container">
      <div className="message">
        <h1 className="welcome__message"> Welcome To Room Setup </h1>
        <span>{`Hi ${user.firstName}, no meeting rooms have been created in your centre.`}</span>
      </div>
      <div className="image">
        <ImageLoader
          source={welcomeImage}
          altText="welcome_page_illustration"
        />
      </div>
      <div className="welcome__button">
        <Button
          classProp="button"
          title="Get Started"
          handleClick={handleClick('SetupInfoPage')}
        />
      </div>
    </div>
  );
}
WelcomePage.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.shape.isRequired,
};

WelcomePage.defaultProps = {
  handleClick: /* istanbul ignore next */ () => { },
};

export default WelcomePage;
