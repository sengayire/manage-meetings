import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import BookedRoomsHOC from '../../../src/components/analytics/BookedRoomsHOC';
import { apiRequest } from '../../../src/json_requests';
import ComposedBookedRooms from '../../../src/components/analytics/ComposedBookedRooms';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';

const mock = new MockAdapter(apiRequest);
const { BASE_URL } = process.env || '';

const response = roomUsage;
mock.onPost(BASE_URL).reply(200, response);

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
      mostUsedRooms: [],
      fetching: true,
      error: null,
    });
  });
});

describe('Updates the state after fetching the API data', () => {
  it('should update the state with least used rooms (This Week)', async () => {
    const wrapperWeekly = shallow(<BookedRoomsHOC {...props} />);
    props.dateValue = 'This Week';
    const { dateValue } = props;

    await wrapperWeekly.instance().fetchMostAndLeastUsedRooms(dateValue);
    const rooms = response['Least Used Rooms'].Room;
    const meetings = response['Least Used Rooms'].Meetings;
    const meetingShares =
      response['Least Used Rooms']['% Share of All Meetings'];

    const mostUsedRooms = response['Most Used Rooms'].Room;
    const mostUsedMeetings = response['Most Used Rooms'].Meetings;
    const mostIUsedMeetingShares =
      response['Most Used Rooms']['% Share of All Meetings'];
    const leastUsedData = [rooms, meetings, meetingShares];
    const mostUsedData = [
      mostUsedRooms,
      mostUsedMeetings,
      mostIUsedMeetingShares,
    ];

    expect(wrapperWeekly.state()).toEqual({
      leastUsedRooms: leastUsedData,
      mostUsedRooms: mostUsedData,
      fetching: false,
      error: null,
    });
  });
  it('should update the state with rooms (This Month)', async () => {
    const wrapperMonthly = shallow(<BookedRoomsHOC {...props} />);
    // Change the dateValue prop to "This Month" before passing it to the component.
    props.dateValue = 'This Month';
    const { dateValue } = props;
    await wrapperMonthly.instance().fetchMostAndLeastUsedRooms(dateValue);

    const rooms = response['Most Used Rooms'].Room;
    const meetings = response['Most Used Rooms'].Meetings;
    const meetingShares =
      response['Most Used Rooms']['% Share of All Meetings'];

    const leastUsedRooms = response['Least Used Rooms'].Room;
    const leastUsedMeetings = response['Least Used Rooms'].Meetings;
    const leastUsedMeetingShares =
      response['Least Used Rooms']['% Share of All Meetings'];

    const mostUsedData = [rooms, meetings, meetingShares];
    const leastUsedData = [
      leastUsedRooms,
      leastUsedMeetings,
      leastUsedMeetingShares,
    ];

    expect(wrapperMonthly.state()).toEqual({
      leastUsedRooms: leastUsedData,
      mostUsedRooms: mostUsedData,
      fetching: false,
      error: null,
    });
  });

  it('should update the state with rooms (Today)', async () => {
    // Change the dateValue prop to "Today" before passing it to the component.
    props.dateValue = 'Today';
    const wrapperDaily = shallow(<BookedRoomsHOC {...props} />);
    const { dateValue } = props;
    await wrapperDaily.instance().fetchMostAndLeastUsedRooms(dateValue);

    const rooms = response['Most Used Rooms'].Room;
    const meetings = response['Most Used Rooms'].Meetings;
    const meetingShares =
      response['Most Used Rooms']['% Share of All Meetings'];

    const leastUsedRooms = response['Least Used Rooms'].Room;
    const leastUsedMeetings = response['Least Used Rooms'].Meetings;
    const leastUsedMeetingShares =
      response['Least Used Rooms']['% Share of All Meetings'];

    const mostUsedData = [rooms, meetings, meetingShares];
    const leastUsedData = [
      leastUsedRooms,
      leastUsedMeetings,
      leastUsedMeetingShares,
    ];

    expect(wrapperDaily.state()).toEqual({
      mostUsedRooms: mostUsedData,
      leastUsedRooms: leastUsedData,
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

  it('should receive props as expected', () => {
    const wrapper = shallow(<BookedRoomsHOC {...props} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'fetchMostAndLeastUsedRooms');
    instance.componentWillReceiveProps(props);
    expect(spy).toHaveBeenCalled();
  });
});
