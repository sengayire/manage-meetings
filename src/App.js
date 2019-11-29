/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import ROUTES from './utils/routes';
import { Preference, RoomFeedbackPage } from './containers';
import { LoginPage } from './components';
import Constants from './utils/Constants';
import '../src/assets/styles/toastr.scss';
import ErrorBoundary from './components/commons/ErrorBoundary';
import { getToken, clearCookies } from './utils/Cookie';
import Setup from './containers/Setup';
import PageNotFound from './containers/PageNotFound';
import { AddResources } from './components/onboarding/addResources';
import {
  getUserDetails,
  getAllLocations,
  getUserLocation,
  getRoomsStructure,
} from './components/helpers/QueriesHelpers';
import GetNewUsersLocation from './containers/GetNewUsersLocation';
import { removeItemFromLocalStorage } from './utils/Utilities';
import WelcomePage from './components/onboarding/WelcomePage';
import BuildingsSetup from './components/onboarding/BuildingsSetup/index';
import Container from './containers/mainContainer';
import OnboardingPages from './containers/OnboardingPages';
import centerSetupLevel from './components/helpers/centerStructureHelper';
import Rooms from './components/onboarding/addRooms';
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
   * Handles token validity or expiration
   */
  /* eslint consistent-return: 0 */

  setLoggedInState = () => {
    const token = getToken();
    const { push } = this.props.history;
    let expiredToken;
    try {
      expiredToken = jwtDecode(token).exp;
      if (!token || Date.now() >= expiredToken * 1000) {
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
    const [user, locations] = await Promise.all([
      getUserDetails(),
      getAllLocations(),
    ]);
    let isCenterSetup;
    if (user.location) {
      isCenterSetup = await centerSetupLevel();
    } else {
      isCenterSetup = null;
    }
    const userLocation = locations.find(({ name }) => name === user.location);
    if (userLocation === undefined) {
      this.setState({
        userLocation: 'Lagos',
        defaultState: true,
        userRole: user.roles[0].role,
        isCenterSetup,
      });
    } else {
      this.setState({
        userLocation,
        defaultState: false,
        userRole: user.roles[0].role,
        isCenterSetup,
      });
    }
  }

  render() {
    const {
      loggedIn,
      userLocation,
      userRole,
      defaultState,
      isCenterSetup,
    } = this.state;
    const { location } = this.props;

    if (defaultState && userLocation) {
      return <GetNewUsersLocation userLocation={this.state.userLocation} />;
    }

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
        {(client) => {
          if (loggedIn && !userLocation) {
            return <GetNewUsersLocation userLocation={userLocation} />;
          }

          try {
            getUserLocation();
          } catch (error) {
            if (userLocation) {
              client.writeData({
                data: { userLocation, userRole },
              });
            }
          }


          {/* if ((userRole === 'Admin' || userRole === 'Super Admin') && isCenterSetup) {
            return <OnboardingPages centerSetupLevel={isCenterSetup} />;
          } */}

          return (
            <ErrorBoundary isAuthError>
              <Switch>
                <Route path={ROUTES.home} exact component={LoginPage} />
                <Route exact path={ROUTES.analytics} component={Container} />
                <Route exact path={ROUTES.roomfeedback} component={RoomFeedbackPage} />
                <Route exact path={ROUTES.buildingsSetup} component={BuildingsSetup} />
                <Route exact path={ROUTES.analytics} component={AddResources} />
                <Route exact path={ROUTES.preference} component={Preference} />
                <Route exact path={ROUTES.setup} component={Setup} />
                <Route component={PageNotFound} />
              </Switch>
            </ErrorBoundary>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default withRouter(App);
