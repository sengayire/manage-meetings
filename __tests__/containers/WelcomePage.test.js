import React from 'react';
import { shallow } from 'enzyme';
import WelcomePage from '../../src/components/onboarding/WelcomePage';

const wrapper = shallow(
  <WelcomePage />,
);

describe('Onboarding welcome page component', () => {
  it('renders correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('It should test the link path', () => {
    wrapper.setProps({
      handleOnClick: jest.fn(),
    });
    wrapper.find('#welcome-botton').simulate('click', {});
    expect(wrapper).toBeDefined();
  });
});
