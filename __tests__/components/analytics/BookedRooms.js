import React from 'react';
import { shallow, mount } from 'enzyme';
import BookedRooms from '../../../src/components/analytics/BookedRooms';
import bookedRoomsList from '../../../__mocks__/rooms/bookedRoomsList';

describe('BookedRooms component', () => {
  const props = {
    bookedRoomsList,
    pollIcon: '',
    moreIcon: '',
    bookedRoomText: '',
    fetching: false,
    error: null,
    tip: '',
  };
  const rooms = bookedRoomsList.length ? Object.values(bookedRoomsList[0]) : [];
  const meetings = bookedRoomsList.length
    ? Object.values(bookedRoomsList[1])
    : [];
  const meetingShares = bookedRoomsList.length
    ? Object.values(bookedRoomsList[2])
    : [];
  const wrapper = shallow(<BookedRooms {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a single room ', () => {
    expect(rooms).toContain('Asmara');
  });

  it(' should render rooms data in  Rooms table', () => {
    const tableWrapper = mount(
      <BookedRooms
        {...props}
        rooms={rooms}
        meetings={meetings}
        meetingShares={meetingShares}
      />);
    expect(tableWrapper.find('table')
      .children().find('tbody').children()
      .find('tr').length)
      .toBe(5);
  });
});
