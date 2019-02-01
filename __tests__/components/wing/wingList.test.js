import React from 'react';
import { shallow } from 'enzyme';

import { WingList } from '../../../src/components/wing/wingList';
import defaultUserRole from '../../../src/fixtures/user';

describe('Tests for SettingOffices', () => {
  const shalloWrapper = shallow(<WingList user={defaultUserRole} />);

  it('renders the snapshot correctly', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle WingList component', () => {
    const props = {
      allWings: {
        allWings: [{ name: 'epic', id: 1 }],
      },
    };
    shallow(<WingList allWings={props.allWings} user={{}} />);
    expect(props.allWings.allWings).toHaveLength(1);
  });
});
