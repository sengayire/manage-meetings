import React from 'react';
import { shallow } from 'enzyme';

import SettingsOffices from '../../src/components/OfficeList';

describe('Tests for SettingOffices', () => {
  const shalloWrapper = shallow(<SettingsOffices />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });
});
