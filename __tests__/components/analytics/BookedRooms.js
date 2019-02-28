import React from 'react';
import { shallow, mount } from 'enzyme';
import BookedRooms from '../../../src/components/analytics/BookedRooms';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';

describe('BookedRooms component', () => {
  const props = {
    bookedRoomsList: roomUsage,
    pollIcon: '',
    moreIcon: '',
    bookedRoomText: '',
    fetching: false,
    error: null,
    tip: '',
  };

  const wrapper = shallow(<BookedRooms {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(' should render rooms data in  Rooms table', () => {
    const tableWrapper = mount(<BookedRooms {...props} bookedRoomsList={roomUsage} />);
    expect(
      tableWrapper
        .find('.table')
        .children()
        .find('.table__body')
        .children()
        .find('.table__row--analytics').length,
    ).toBe(3);
  });

  it('should render error div', () => {
    const bookedRoomsComponent = mount(
      <BookedRooms
        {...props}
        error={{ error: 'this error occurred' }}
        bookedRoomsList={[]}
        fetching
      />,
    );
    expect(bookedRoomsComponent.find('.error-msg')).toHaveLength(1);
  });

  it('should load ProgressBar div', () => {
    const bookedRoomsComponent = mount(<BookedRooms {...props} bookedRoomsList={[]} fetching />);
    expect(bookedRoomsComponent.find('ProgressBar')).toHaveLength(1);
  });
});
