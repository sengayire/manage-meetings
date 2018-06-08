import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './utils/routes';
import { Settings, Analytics, Feedback } from './containers';
import { Login } from './components';

class App extends Component {
  // this component is later statefull in the PR (https://github.com/andela/mrm_front/pull/22)
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={ROUTES.home} component={Login} />
          <Route path={ROUTES.settings} component={Settings} />
          <Route path={ROUTES.analytics} component={Analytics} />
          <Route path={ROUTES.feedback} component={Feedback} />
        </Switch>
      </Router>
    );
  }
}

export default App;
