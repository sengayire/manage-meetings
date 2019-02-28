import React from 'react';
import { shallow } from 'enzyme';
import Device from '../../../src/components/devices/Device';
import deviceData from '../../../__mocks__/deviceData';

describe('Device Component', () => {
  const deviceWrappper = shallow(<Device device={deviceData} />);
  it('renders without crashing', () => {
    expect(shallow(<Device device={deviceData} />)).toMatchSnapshot();
  });
  it('renders the correct content', () => {
    const td = deviceWrappper.find('span');
    const dev = [
      'Samsung Galaxy',
      'Internal Display',
      '14 Aug 2018',
      '16 Feb 2018',
      'Nairobi',
    ];
    let i = 0;
    expect(td).toHaveLength(5);
    td.forEach((item) => {
      expect(item.text()).toContain(dev[i]);
      i += 1;
    });
  });
});
