import React from 'react';
import { shallow } from 'enzyme';

import SettingsContent from '../src/containers/SettingsContent';

describe('Tests for SettingsContent', () => {
  const shalloWrapper = shallow(<SettingsContent />);

  it('renders correctly in memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });
});
