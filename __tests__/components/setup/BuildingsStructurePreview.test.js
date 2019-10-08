import React from 'react';
import { shallow } from 'enzyme';
import BuildingsStructurePreview from '../../../src/components/onboarding/BuildingsSetup/BuildingsStructurePreview';

describe.only('Setup component', () => {
  const wrapper = shallow(<BuildingsStructurePreview />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
