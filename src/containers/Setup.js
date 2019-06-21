import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import SetupPage from '../components/setup/Setup';
import { NavBar } from '../components';

const Setup = ({ location: { state: searchState } }) => (
  <Fragment>
    <NavBar />
    <SetupPage searchState={searchState} />
  </Fragment>
);

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
