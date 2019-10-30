import React from 'react';
import { shallow } from 'enzyme';
import OfficeStructurePreview from '../../../src/components/onboarding/officeStructure/officeStructurePreview';


describe('OfficeStructurePreview component', () => {
  const wrapper = shallow(<OfficeStructurePreview />);

  it('should render with no errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
