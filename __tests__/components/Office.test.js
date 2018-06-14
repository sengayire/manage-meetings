import React from 'react';
import { shallow } from 'enzyme';

import data from '../../__mocks__/data';
import Office from '../../src/components/Office';

describe('Tests for SettingOffices', () => {
  const shalloWrapper = shallow(<Office office={data.office} />);

  it('renders correctly from memory', () => {
    expect(shalloWrapper).toMatchSnapshot();
  });
});
