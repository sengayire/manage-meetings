import React from 'react';
import { shallow } from 'enzyme';
import DeviceList from '../../src/components/DeviceList';

describe('DeviceList Component', () => {
  it('renders correctly from memory', () => {
    expect(shallow(<DeviceList />)).toMatchSnapshot();
  });
});
