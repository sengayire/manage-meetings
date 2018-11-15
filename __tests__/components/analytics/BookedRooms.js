import React from 'react';
import { shallow } from 'enzyme';
import BookedRooms from '../../../src/components/analytics/BookedRooms';
import bookedRoomsList from '../../../src/fixtures/mostBookedRooms';

describe('BookedRooms component', () => {
  it('should render correctly', () => {
    const props = {
      bookedRoomsList,
      pollIcon: '',
      moreIcon: '',
      bookedRoomText: '',
      fetching: false,
    };
    const wrapper = shallow(<BookedRooms {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
