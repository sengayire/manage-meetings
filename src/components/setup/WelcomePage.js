import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { welcomeImage } from '../../utils/images/images';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import Spinner from '../commons/Spinner';
import Button from '../commons/Button';
import '../../assets/styles/setupWelcomePage.scss';
import { GET_USER_ROLE } from '../../graphql/queries/People';

const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
const { firstName, email } = userData || {};

const WelcomePage = (props) => {
  const { loading } = props.data;
  if (loading) {
    return (
      <div className="setup__spinner">
        <Spinner />
      </div>
    );
  }
  const { user } = props.data;
  return (
    <div className="welcome">
      <div className="message">
        <h1 className="welcome__message"> Welcome To Room Setup </h1>
        <span>
          {`Hi ${firstName}, no meeting rooms have been created in your centre.`}
        </span>
      </div>
      <div className="image">
        <img src={welcomeImage} alt="" />
      </div>
      <div className="welcome__button">
        <Button
          classProp="button"
          title="Get Started"
          isDisabled={user.roles[0].role === 'Default User'}
        />
      </div>
    </div>
  );
};
WelcomePage.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};
export default graphql(GET_USER_ROLE, {
  options: /* istanbul ignore next */ () => ({
    variables: { email: process.env.NODE_ENV === 'test' ? 'davis.kimame@andela.com' : email },
  }),
})(WelcomePage);
