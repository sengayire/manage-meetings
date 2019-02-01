import React from 'react';
import { shallow } from 'enzyme';

import { WingList } from '../../../src/components/wing/wingList';
import defaultUserRole from '../../../src/fixtures/user';

describe('Tests for SettingOffices', () => {
  const initialProps = {
    allWings: {
      allWings: [{ name: 'epic', id: 1 }],
    },
    user: defaultUserRole,
  };
  const shalloWrapper = shallow(<WingList
    allWings={initialProps.allWings}
    user={defaultUserRole}
  />);

  it('renders the snapshot correctly', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle WingList component', () => {
    const props = {
      allWings: {
        allWings: [{ name: 'epic', id: 1 }],
      },
      user: defaultUserRole,
    };
    shallow(<WingList allWings={props.allWings} user={defaultUserRole} />);
    expect(props.allWings.allWings).toHaveLength(1);
  });
});
