import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import ROUTES from './utils/routes';
import { Analytics, Preference, RoomFeedbackPage } from './containers';
import { LoginPage } from './components';
import Constants from './utils/Constants';
import '../src/assets/styles/toastr.scss';
import ErrorBoundary from './components/commons/ErrorBoundary';
import { getToken, clearCookies } from './utils/Cookie';
import Setup from './containers/Setup';
import PageNotFound from './containers/PageNotFound';
import { getUserDetails, getAllLocations, getUserLocation } from './components/helpers/QueriesHelpers';
import { removeItemFromLocalStorage } from './utils/Utilities';

// destruscture constants to be used
const {
  MESSAGES: { authenticationError },
  MRM_TOKEN,
} = Constants;
class App extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    loggedIn: false,
  };

  componentDidMount() {
    this.setLoggedInState();
  }

  /**
 * this function passes a condition that checks for token
 * and either rerender the state or call in the next function
 */
  /* eslint consistent-return: 0 */

  setLoggedInState = () => {
    const token = getToken();
    const { push } = this.props.history;
    let expiredToken;
    try {
      expiredToken = jwtDecode(token).exp;
      if (!token || (Date.now() >= expiredToken * 1000)) {
        removeItemFromLocalStorage(MRM_TOKEN);
        clearCookies();
        this.props.history.push('/');
        this.setState({ loggedIn: false });
        return;
      }
      this.setState({ loggedIn: true });
      return this.setUserState();
    } catch (error) {
      push(ROUTES.home);
    }
  };

  /**
 * this function is used to set the users state(the location and the role)
 */
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
