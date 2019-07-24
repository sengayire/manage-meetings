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
import PageNotFound from './containers/PageNotFound';
import { getUserDetails, getAllLocations, getUserLocation } from './components/helpers/QueriesHelpers';

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

  componentDidMount() {
    this.setLoggedInState();
  }


  setLoggedInState = () => {
    const token = getToken();
    if (!token) {
      return this.setState({ loggedIn: false });
    }

    this.setState({ loggedIn: true });
    return this.setUserState();
  };

  async setUserState() {
    const [user, locations] = await Promise.all([getUserDetails(), getAllLocations()]);
    const userLocation = locations.find(({ name }) => name === user.location);
    this.setState({
      userLocation,
      userRole: user.roles[0].role,
    });
  }

  render() {
    const { loggedIn, userLocation, userRole } = this.state;
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
        {
          (client) => {
            if (loggedIn && !userLocation) return <div />;


            try {
              getUserLocation();
            } catch (error) {
              if (userLocation) {
                client.writeData({
                  data: { userLocation, userRole },
                });
              }
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
      </ApolloConsumer>
    );
  }
}

export default withRouter(App);
