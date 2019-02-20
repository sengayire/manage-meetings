import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import App from '../src/App';
import ROUTES from '../src/utils/routes';

jest.mock('../src/utils/Utilities');
jest.mock('../src/utils/Cookie');

const utilityFunctions = require('../src/utils/Cookie');

const routes = [ROUTES.home, ROUTES.settings];
const pageComponent = (
  <MockedProvider>
    <MemoryRouter initialEntries={routes} initialIndex={1} keyLength={0}>
      <App />
    </MemoryRouter>
  </MockedProvider>
);

describe('App component', () => {
  const wrapper = mount(pageComponent);

  it('Should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StaticRouter context={{}}>
        <App />
      </StaticRouter>,
      div,
    );
  });

  it('should redirect to login page if no token in local storage', () => {
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('should not render Login if token is present but render Analytics page', () => {
    // make a mock token
    utilityFunctions.getToken.mockImplementation(
      () => 'MOCK_TOKEN',
    );
    // mount wrapper
    const appWrapper = mount(pageComponent);
    // test whether it goes to the settings page
    expect(appWrapper.find('Login')).toHaveLength(0);
    expect(appWrapper.find('.top-menu')).toHaveLength(1);
    expect(appWrapper).toMatchSnapshot();
  });
});
