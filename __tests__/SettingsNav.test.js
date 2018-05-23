import React from 'react';
import { shallow } from 'enzyme';

import SettingsNavTabs from '../src/components/SettingsNav';

describe('Tests for SettingsNavTabs', () => {
  const shalloWrapper = shallow(<SettingsNavTabs />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('renders the right number of links', () => {
    const tabsWrapper = shalloWrapper.find('div.settings-tabs ul').children();
    expect(tabsWrapper).toHaveLength(6);
  });
});
