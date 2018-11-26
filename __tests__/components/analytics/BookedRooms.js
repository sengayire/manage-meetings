import React from 'react';
import { shallow } from 'enzyme';
import BookedRooms from '../../../src/components/analytics/BookedRooms';
import bookedRoomsList from '../../../__mocks__/rooms/bookedRoomsList';
// import bookedRoomsList from '../../'

describe('BookedRooms component', () => {
  it('should render correctly', () => {
    const props = {
      bookedRoomsList,
      pollIcon: '',
      moreIcon: '',
      bookedRoomText: '',
      fetching: false,
      tip: '',
    };
    const wrapper = shallow(<BookedRooms {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
