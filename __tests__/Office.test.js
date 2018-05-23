import React from 'react';
import { shallow } from 'enzyme';

import Office from '../src/components/Office';

describe('Tests for SettingOffices', () => {
  const office = {
    name: 'EPIC Tower',
    location: 'Nigeria',
    timezone: 'GMT +1',
  };

  const shalloWrapper = shallow(<Office office={office} />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });
});
