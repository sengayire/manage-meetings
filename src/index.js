import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'react-css-themr';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import apolloClient from './utils/ApolloClient';
import './assets/styles/index.scss';

const RTButton = require('react-toolbox/lib/button/theme.css');
const RTDialog = require('react-toolbox/lib/dialog/theme.css');
const RTLink = require('react-toolbox/lib/link/theme.css');
const RTSnackbar = require('react-toolbox/lib/snackbar/theme.css');
const RTDropdown = require('react-toolbox/lib/dropdown/theme.css');

const contextTheme = {
  RTButton,
  RTDialog,
  RTLink,
  RTSnackbar,
  RTDropdown,
};

ReactDOM.render(
  <ThemeProvider theme={contextTheme}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
