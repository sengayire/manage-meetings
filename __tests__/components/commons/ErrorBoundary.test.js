import React from 'react';
import { mount } from 'enzyme';
import ErrorBoundary from '../../../src/components/commons/ErrorBoundary';
import Spinner from '../../../src/components/commons/Spinner';
import { getItemFromLocalStorage } from '../../../src/utils/Utilities';

describe('ErrorBoundary component', () => {
  const wrapper = mount(
    <ErrorBoundary >
      <Spinner />
    </ErrorBoundary>,
  );
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render children', () => {
    expect(wrapper.find('.spinner').length).toBe(1);
  });
  it('handles componentDidCatch()', () => {
    expect(wrapper.instance().componentDidCatch());
  });
  it('generates error message when an error is caught', () => {
    wrapper.setState({
      error: ' This is the error.',
      errorInfo: 'This is the error info',
    });
    expect(wrapper.text()).toEqual('Something went wrong');
  });

  it('it should remove clear cookies upon receiving invalid token', () => {
    const errorWrapper = mount(
      <ErrorBoundary isAuthError >
        <Spinner />
      </ErrorBoundary>,
    );
    errorWrapper.setState({
      error: ' This is the error.',
      errorInfo: 'This is the error info',
    });
    window.location.assign = jest.fn();
    global.localStorage = undefined;
    expect(getItemFromLocalStorage('key')).toEqual(null);
  });
});
