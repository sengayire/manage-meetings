import React from 'react';
import { shallow } from 'enzyme';
import AddResourcesTitle from '../../../../src/components/onboarding/addResources/addResourcesTitle';

let component = '';

describe('ADD RESOURCES TITLE', () => {
  beforeEach(() => {
    component = shallow(<AddResourcesTitle />);
  });

  it('should render properly', () => {
    expect(component).toMatchSnapshot();
  });
});
