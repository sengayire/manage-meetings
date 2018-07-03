import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from '../../../src/components/login/LoginButton';

describe('LoginButton should', () => {
  it('should render properly', () => {
    global.process.env = {
      ANDELA_LOGIN_URL: 'mockLoginUrl',
      MRM_URL: 'mockMrmUrl',
    };
    expect(shallow(<LoginButton />)).toMatchSnapshot();
  });

  it('should render undefined when no environment variables are found', () => {
    global.process.env = null;
    expect(shallow(<LoginButton />)).toMatchSnapshot();
  });
});
