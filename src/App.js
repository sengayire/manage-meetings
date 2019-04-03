import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
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
            pathname: ROUTES.home,
            state: { errorMessage: authenticationError },
          }}
        />
      );
    }

    return (
      <ApolloConsumer>
        {client => (
          <ErrorBoundary isAuthError>
            <Switch>
              <Route exact path={ROUTES.home} component={LoginPage} />
              <Route path={ROUTES.analytics} component={Analytics} />
              <Route path={ROUTES.roomfeedback} component={RoomFeedbackPage} />
              <Route path={ROUTES.preference} component={Preference} />
              <Route path={ROUTES.setup} render={props => <Setup {...props} client={client} />} />
            </Switch>
          </ErrorBoundary>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(App);
