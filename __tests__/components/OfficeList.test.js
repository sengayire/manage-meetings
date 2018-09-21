import React from 'react';
import { shallow } from 'enzyme';

import SettingsOffices, { OfficeList } from '../../src/components/OfficeList';

describe('Tests for SettingOffices', () => {
  const shalloWrapper = shallow(<SettingsOffices />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('should handle OfficeList component', () => {
    const props = {
      allOffices: {
        allOffices: {
          offices: [{
            id: '11',
            name: 'Epic Tower',
            location: {
              name: 'LAGOS',
              timeZone: 'WEST',
            },
          }],
        },
      },
      loading: true,
    };
    shallow(<OfficeList {...props} />);
    expect(props.allOffices.allOffices.offices).toHaveLength(1);
  });
});
