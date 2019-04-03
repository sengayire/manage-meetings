import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SetupPage from '../components/setup/Setup';
import { NavBar } from '../components';

const Setup = ({ client }) => (
  <Fragment>
    <NavBar />
    <SetupPage client={client} />
  </Fragment>
);

Setup.propTypes = {
  client: PropTypes.shape({}),
};
Setup.defaultProps = {
  client: {},
};

export default Setup;
