import React from 'react';
import { shallow } from 'enzyme';
import Room from '../../src/components/Room';

describe('Room Component', () => {
  const room = {
    name: 'Kampala',
    location: 'Kampala',
    office: 'The Oak',
  };

  const roomWrapper = shallow(<Room room={room} />);

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
