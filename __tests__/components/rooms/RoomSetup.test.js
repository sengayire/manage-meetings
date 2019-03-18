import React from 'react';
import { shallow } from 'enzyme';
import RoomSetup from '../../../src/components/rooms/RoomSetup';

describe('Unit test for room  Component', () => {
  const props = {
    roomImage: 'Image',
    roomName: 'Obudu',
    floorName: '4th Floor',
    wingName: 'Big Apple',
    blockName: '4M',
    numberOfSeats: 5,
    numberOfResources: 6,
  };

  const wrapper = shallow(<RoomSetup {...props} />);
  it('Should render room setup card component correctly', () => {
    expect(wrapper.find('.room-setup-card').exists()).toBe(true);
    expect(wrapper.find('.room-setup-card').children().length).toBe(2);
    expect(wrapper.find('.room-details-container').children().length).toBe(4);
    expect(wrapper.find('.room-details').children().length).toBe(3);
  });
});

