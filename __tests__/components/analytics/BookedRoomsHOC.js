import React from 'react';
import { shallow } from 'enzyme';
import BookedRoomsHOC from '../../../src/components/analytics/BookedRoomsHOC';
import BookedRooms from '../../../src/components/analytics/BookedRooms';
import ComposedBookedRooms from '../../../src/components/analytics/ComposedBookedRooms';

describe('BookedRoomsHOC Component', () => {
  it('should renders correctly', () => {
    const MostBookedRooms = BookedRoomsHOC(BookedRooms, 'Most Booked Rooms');
    const LeastBookedRooms = BookedRoomsHOC(BookedRooms, 'Least Booked Rooms');
    expect(shallow(<MostBookedRooms />)).toMatchSnapshot();
    expect(shallow(<LeastBookedRooms />)).toMatchSnapshot();
    expect(shallow(<ComposedBookedRooms />)).toMatchSnapshot();
  });
});
