import React from 'react';
import { mount } from 'enzyme';
import Device from '../../../src/components/devices/Device';
import deviceData from '../../../__mocks__/deviceData';

describe('Device Component', () => {
  it('renders without crashing', () => {
    expect(mount(<Device device={deviceData} />)).toMatchSnapshot();
  });
});
