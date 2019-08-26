import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import SetupPage from '../components/setup/Setup';
import { NavBar } from '../components';

class Setup extends Component {
  state = {
    userLocationChanged: false,
  };

  changeUserLocation = () => {
    this.setState({ userLocationChanged: !this.state.userLocationChanged });
  };

  render() {
    const { location: { state: searchState } } = this.props;
    const { userLocationChanged } = this.state;
    return (
      <Fragment>
        <NavBar changeUserLocation={this.changeUserLocation} />
        <SetupPage searchState={searchState} userLocationChanged={userLocationChanged} />
      </Fragment>
    );
  }
}

Setup.propTypes = {
  location: PropTypes.shape({
    state: {
      component: PropTypes.string,
      query: PropTypes.string,
    },
  }),
};

Setup.defaultProps = {
  location: PropTypes.shape({
    state: undefined,
  }),
};

export default Setup;
