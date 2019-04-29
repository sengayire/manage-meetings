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
    tip: '',
  };

  const wrapper = shallow(<BookedRooms {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(' should render rooms data in  Rooms table', () => {
    const tableWrapper = mount(<BookedRooms {...props} />);
    expect(
      tableWrapper
        .find('.table').length,
    ).toBe(1);
    expect(
      tableWrapper
        .find('.table__row--analytics').length,
    ).toBe(2);
  });

  it('should render error div', () => {
    const bookedRoomsComponent = mount(
      <BookedRooms
        {...props}
        bookedRoomsList={[]}
      />,
    );
    expect(bookedRoomsComponent.find('ErrorIcon').exists()).toBeTruthy();
  });

  it('should load ProgressBar div', () => {
    const bookedRoomsComponent = mount(<BookedRooms {...props} bookedRoomsList={[]} fetching />);
    expect(bookedRoomsComponent.find('Overlay')).toHaveLength(1);
  });
});
