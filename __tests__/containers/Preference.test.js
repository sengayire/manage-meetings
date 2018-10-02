import React from 'react';
import { shallow } from 'enzyme';

import Preference from '../../src/containers/Preference';

describe('Preference Component', () => {
  const wrapper = shallow(<Preference />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
