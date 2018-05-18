import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import App from './App';
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
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
