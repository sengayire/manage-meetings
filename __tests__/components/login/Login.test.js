import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import LoginComponent, { Login } from '../../../src/components/login/Login';

describe('Login component', () => {
  const wrapperCode = (
    <MemoryRouter keyLength={0}>
      <LoginComponent />
    </MemoryRouter>
  );
  const wrapper = mount(wrapperCode);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter keyLength={0}>
        <LoginComponent />
      </MemoryRouter>,
      div,
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the correct heading text', () => {
    expect(wrapper.find('header>h1')).toHaveLength(1);
    expect(wrapper.find('header>h1').text()).toBe('CONVERGE');
  });

  it('renders the correct mrm introduction text', () => {
    const mrmIntro =
      'Meet the Meeting Room Appthat your meeting room app aspires to be.';
    expect(wrapper.find('#converge-intro')).toHaveLength(1);
    expect(wrapper.find('#converge-intro').text()).toBe(mrmIntro);
  });

  it('renders the tablet image', () => {
    expect(wrapper.find('#dark-tablet img')).toHaveLength(1);
  });

  it('renders login button', () => {
    //   check whether login button exists
    expect(wrapper.find('.btn-signin')).toHaveLength(1);
  });

  it('should call componentWillUnmount when unmounted', () => {
    sinon.spy(Login.prototype, 'componentWillUnmount');
    const loginWrapper = mount(<Login
      location={{
          state: { errorMesage: 'Something Went Wrong' },
          pathname: '/',
        }}
      history={{ push: jest.fn() }}
    />);
    expect(loginWrapper).toMatchSnapshot();
    loginWrapper.unmount();
    expect(Login.prototype.componentWillUnmount).toHaveProperty('callCount', 1);
    Login.prototype.componentWillUnmount.restore();
  });

  it('should display an error when login error occurs and close snackbar on time out', () => {
    const push = jest.fn();
    const loginWrapper = mount(<Login
      location={{
          search: '?error=Something%20Went%20Wrong',
          pathname: '/',
        }}
      history={{ push }}
    />);
    expect(loginWrapper).toMatchSnapshot();
    // find the error message and check whether its the expected error message
    expect(loginWrapper.find('Snackbar').length).toBe(1);
    expect(loginWrapper.find('Snackbar').prop('label')).toBe(loginWrapper.state().loginError);
    // call time out function and check whether snackbar closes
    loginWrapper.find('Snackbar').prop('onTimeout')();
    expect(push).toHaveBeenCalled();
    expect(loginWrapper.state().loginError).toBe(null);
    loginWrapper.update();
    expect(loginWrapper.find('Snackbar')).toHaveLength(0);
    expect(loginWrapper).toMatchSnapshot();
  });
});
