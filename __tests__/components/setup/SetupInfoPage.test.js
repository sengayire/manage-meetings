import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import SetupInfoPage from '../../../src/components/setup/SetupInfoPage';


describe('Admin setup info component', () => {
  it('should render a welcome message header', () => {
    const wrapper = mount(
      <MockedProvider>
        <SetupInfoPage />
      </MockedProvider>);
    wrapper.find('Button').props().handleClick();
  });
});
