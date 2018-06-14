import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from '../src/App';
import ROUTES from '../src/utils/routes';

jest.mock('../src/utils/Utilities');
const utilityFUnctions = require('../src/utils/Utilities');

const routes = [ROUTES.home, ROUTES.settings];
const wrapperCode = (
  <MemoryRouter initialEntries={routes} initialIndex={1} keyLength={0}>
    <App />
  </MemoryRouter>
);

describe('App component', () => {
  const wrapper = mount(wrapperCode);

  it('Should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <StaticRouter context={{}}>
        <App />
      </StaticRouter>,
      div,
    );
  });

  it('should render properly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect to login page if no token in local storage', () => {
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('should not render Login if token is present but render Settings component', () => {
    // make a mock token
    utilityFUnctions.getItemFromLocalStorage.mockImplementation(() => 'MOCK_TOKEN');
    // mount wrapper
    const appWrapper = mount(wrapperCode);
    // test whether it goes to the settings page
    expect(appWrapper.find('Login')).toHaveLength(0);
    expect(appWrapper.find('.settings-vertical')).toHaveLength(1);
    expect(appWrapper).toMatchSnapshot();
  });
});
