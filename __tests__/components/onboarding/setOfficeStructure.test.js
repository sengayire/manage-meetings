import React from 'react';
import { shallow } from 'enzyme';

import SetOfficeStructure from '../../../src/components/onboarding/officeStructure/setOfficeStructure';

describe('setOfficeStructure component', () => {
  const props = {
    blocks: ['Block A', 'Block B'],
    activeBlock: 'Block A',
  };

  const wrapper = shallow(<SetOfficeStructure {...props} />);

  it('should render with no errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
