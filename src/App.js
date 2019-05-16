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
import PageNotFound from './containers/PageNotFound';

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
            pathname: ROUTES.home,
            state: { errorMessage: authenticationError },
          }}
        />
      );
    }

    return (
      <ErrorBoundary isAuthError>
        <Switch>
          <Route path={ROUTES.home} exact component={LoginPage} />
          <Route exact path={ROUTES.analytics} component={Analytics} />
          <Route exact path={ROUTES.roomfeedback} component={RoomFeedbackPage} />
          <Route exact path={ROUTES.preference} component={Preference} />
          <Route exact path={ROUTES.setup} component={Setup} />
          <Route component={PageNotFound} />
        </Switch>
      </ErrorBoundary>
    );
  }
}

export default withRouter(App);
