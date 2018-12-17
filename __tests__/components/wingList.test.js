import React from 'react';
import { shallow } from 'enzyme';

import Wings, { WingList } from '../../src/components/wingList';

describe('Tests for SettingOffices', () => {
  const shalloWrapper = shallow(<Wings />);

  it('renders the snapshot correctly', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle WingList component', () => {
    const props = {
      allWings: {
        allWings: [{ name: 'epic', id: 1 }],
      },
    };

    shallow(<WingList {...props} />);
    expect(props.allWings.allWings).toHaveLength(1);
  });
});
