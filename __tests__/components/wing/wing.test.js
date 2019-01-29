import React from 'react';
import { shallow } from 'enzyme';

import { Wing } from '../../../src/components/wing/wings';

describe('Tests for SettingWings', () => {
  const props = {
    wing: {
      name: 'epic wing',
      floor: { name: 'second floor', block: { name: 'block A' } },
    },
  };
  it('renders without crashing', () => {
    const shalloWrapper = shallow(<Wing {...props} />);
    expect(shalloWrapper).toMatchSnapshot();
  });
  it('renders well without crashing', () => {
    const shalloWrapper = shallow(<Wing {...props} />);
    expect(shalloWrapper).toMatchSnapshot();
  });
});
