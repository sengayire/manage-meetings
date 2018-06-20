import React from 'react';
import { mount } from 'enzyme';
import Room from '../../src/components/Room';

describe('Room Component', () => {
  const room = {
    name: 'Kampala',
    location: 'Kampala',
    office: 'The Oak',
  };
  const roomWrapper = mount(<Room room={room} />);
  it('renders without crashing', () => {
    expect(mount.bind(null, <Room room={room} />)).not.toThrow();
  });
  it('renders the correct content', () => {
    const td = roomWrapper.find('td');
    const rm = ['Kampala', 'Kampala', 'The Oak', 'Edit   Delete'];
    let i = 0;
    expect(td).toHaveLength(4);
    td.forEach((node) => {
      expect(node.text()).toContain(rm[i]);
      i += 1;
    });
  });
});
