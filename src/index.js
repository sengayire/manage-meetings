import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import apolloClient from './utils/ApolloClient';
import './assets/styles/index.scss';

const RTButton = require('react-toolbox/lib/button/theme.css');
const RTDialog = require('react-toolbox/lib/dialog/theme.css');
const RTLink = require('react-toolbox/lib/link/theme.css');

const contextTheme = {
  RTButton,
  RTDialog,
  RTLink,
};

ReactDOM.render(
  <ThemeProvider theme={contextTheme}>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
