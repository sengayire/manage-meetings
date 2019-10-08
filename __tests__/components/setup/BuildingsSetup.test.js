import React from 'react';
import { shallow } from 'enzyme';
import BuildingsSetup from '../../../src/components/onboarding/BuildingsSetup';

describe('Meeting Rooms Setup component', () => {
  const wrapper = shallow(<BuildingsSetup />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
