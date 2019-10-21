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
    expect(wrapper.find('Link').prop('to')).toEqual('/onboarding/setup/buildings');
  });
});
