import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ROUTES from './utils/routes';
import { Analytics, Preference, RoomFeedbackPage } from './containers';
import { LoginPage } from './components';
import Constants from './utils/Constants';
import '../src/assets/styles/toastr.scss';
import ErrorBoundary from './components/commons/ErrorBoundary';
import { getToken } from './utils/Cookie';
import Setup from './containers/Setup';

// destruscture constants to be used
const {
  MESSAGES: { authenticationError },
} = Constants;
class App extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  state = {
    loggedIn: false,
  };

  static getDerivedStateFromProps = () => {
    const token = getToken();
    if (!token) {
      return { loggedIn: false };
    }
    return { loggedIn: true };
  };

  render() {
    const { loggedIn } = this.state;
    const { location } = this.props;

    if (!loggedIn && location.pathname !== ROUTES.home) {
      // redirect to landing page if user isn't logged in
      return (
        <Redirect
          to={{
            pathname: ROUTES.setup,
            state: { errorMessage: authenticationError },
          }}
        />
      );
    }

    return (
      <ErrorBoundary isAuthError>
        <Switch>
          <Route exact path={ROUTES.home} component={LoginPage} />
          <Route path={ROUTES.analytics} component={Analytics} />
          <Route path={ROUTES.roomfeedback} component={RoomFeedbackPage} />
          <Route path={ROUTES.preference} component={Preference} />
          <Route path={ROUTES.setup} component={Setup} />
        </Switch>
      </ErrorBoundary>
    );
  }
}

export default withRouter(App);
