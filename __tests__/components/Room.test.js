import React from 'react';
import { shallow } from 'enzyme';
import Room from '../../src/components/Room';
import { roomLocations } from '../../__mocks__/rooms/Rooms';

describe('Room Component', () => {
  const room = {
    name: 'Kampala',
    location: 'Kampala',
    office: 'The Oak',
    locationId: 1,
  };

  const roomWrapper = shallow(<Room room={room} locations={roomLocations} />);

  it('renders the correct content', () => {
    const td = roomWrapper.find('td');
    const rm = ['Kampala', 'Kampala', 'The Oak', '<EditRoom /> \xa0 Delete'];
    let i = 0;
    expect(td).toHaveLength(4);
    td.forEach((node) => {
      expect(node.text()).toContain(rm[i]);
      i += 1;
    });
  });
});
