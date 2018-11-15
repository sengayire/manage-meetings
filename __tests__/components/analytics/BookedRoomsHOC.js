import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import BookedRoomsHOC from '../../../src/components/analytics/BookedRoomsHOC';
import { apiRequest } from '../../../src/json_requests';
import ComposedBookedRooms from '../../../src/components/analytics/ComposedBookedRooms';
import leastUsedRooms from '../../../__mocks__/rooms/leastUsedRooms';

const mock = new MockAdapter(apiRequest);
const { BASE_URL } = process.env || '';

const props = {
  dateValue: 'Today',
  component: ComposedBookedRooms,
  bookedRoomText: '',
};

describe('BookedRoomsHOC Component', () => {
  it('should renders correctly', () => {
    const MostBookedRooms = BookedRoomsHOC;
    const LeastBookedRooms = BookedRoomsHOC;

    expect(shallow(<MostBookedRooms {...props} />)).toMatchSnapshot();
    expect(shallow(<LeastBookedRooms {...props} />)).toMatchSnapshot();
    expect(shallow(<ComposedBookedRooms />)).toMatchSnapshot();
  });

  it('should have empty list initial state', () => {
    const component = shallow(<BookedRoomsHOC {...props} />);
    expect(component.state()).toEqual({
      leastUsedRooms: [],
      fetching: false,
      error: null,
    });
  });
});

describe('Updates the state after fetching the API data', () => {
  const response = leastUsedRooms;
  mock.onPost(BASE_URL).reply(200, response.data);

  it('should update the state with least used rooms (This Week)', async () => {
    const wrapperWeekly = shallow(<BookedRoomsHOC {...props} />);
    props.dateValue = 'This Week';
    const { dateValue } = props;

    await wrapperWeekly.instance().fetchMostAndLeastUsedRooms(dateValue);
    const rooms = response.data['Least Used Rooms'].Room;
    const meetings = response.data['Least Used Rooms'].Meetings;
    const meetingShares =
      response.data['Least Used Rooms']['% Share of All Meetings'];
    const data = [rooms, meetings, meetingShares];

    expect(wrapperWeekly.state()).toEqual({
      leastUsedRooms: data,
      fetching: false,
      error: null,
    });
  });
  it('should update the state with an error when one occurs', async () => {
    mock.onPost(BASE_URL).reply(500);
    const wrapperDaily = shallow(<BookedRoomsHOC {...props} />);
    await wrapperDaily.instance().fetchMostAndLeastUsedRooms();
    expect(wrapperDaily.state('error')).not.toBe(null);
  });
});
