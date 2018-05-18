import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

describe('Analytics component', () => {
  it('Should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
