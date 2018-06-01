import React from 'react';
import { shallow } from 'enzyme';

import AmenityList from '../../src/components/AmenityList';

describe('Tests for AmenityList Component', () => {
  const shalloWrapper = shallow(<AmenityList />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });
});
