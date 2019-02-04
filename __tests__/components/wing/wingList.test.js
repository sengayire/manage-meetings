import React from 'react';
import { shallow } from 'enzyme';

import { WingList } from '../../../src/components/wing/wingList';
import defaultUserRole from '../../../src/fixtures/user';

describe('Tests for SettingOffices', () => {
  const props = {
    allWings: {
      allWings: [{ name: 'epic', id: 1 }],
    },
    data: {
      user: {
        location: '',
      },
    },
  };
  const shalloWrapper = shallow(<WingList {...props} user={defaultUserRole} />);

  it('renders the snapshot correctly', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle WingList component', () => {
    expect(props.allWings.allWings).toHaveLength(1);
  });
});
