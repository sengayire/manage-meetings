import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { welcomeImage } from '../../utils/images/images';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import { getUserDetails } from '../helpers/QueriesHelpers';
import ImageLoader from '../commons/ImageLoader';

// eslint-disable-next-line react/prefer-stateless-function
class WelcomePage extends Component {
  state = {
    user: '',
  };

  componentDidMount = () => {
    this.getUsersInformation();
  };

  /**
   * It queries the Apollo store to fetch user details
   * @returns {Object}
   */
  getUsersInformation = async () => {
    const user = await getUserDetails();
    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;
    if (!user.roles) {
      return (
        <div className="setup__spinner">
          <Spinner />
        </div>
      );
    }
    const { handleClick } = this.props;
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
            isDisabled={user.roles[0].role === 'Default User'}
            handleClick={handleClick('SetupInfoPage')}
          />
        </div>
      </div>
    );
  }
}
WelcomePage.propTypes = {
  handleClick: PropTypes.func,
};

WelcomePage.defaultProps = {
  handleClick: /* istanbul ignore next */ () => {},
};

export default WelcomePage;
