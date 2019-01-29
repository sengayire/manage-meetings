import React from 'react';
import { shallow } from 'enzyme';

import data from '../../../__mocks__/data';
import Office from '../../../src/components/offices/Office';

describe('Tests for SettingOffices', () => {
  it('renders correctly from memory', () => {
    const shalloWrapper = shallow(<Office office={data.office} refetch={data.refetch} />);
    expect(shalloWrapper).toMatchSnapshot();
  });

  it('renders correctly from memory', () => {
    const shalloWrapper = shallow(<Office office={data.officeII} refetch={data.refetch} />);
    expect(shalloWrapper).toMatchSnapshot();
  });
});