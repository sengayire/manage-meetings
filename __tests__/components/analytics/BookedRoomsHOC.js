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
  date: {
    startDate: 'Nov 05 2018',
    endDate: 'Nov 06 2018',
  },
  component: ComposedBookedRooms,
  bookedRoomText: '',
};
const prevProps = {
  date: {
    startDate: 'Nov 16 2018',
    endDate: 'Nov 16 2018',
  },
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
  it('should update the state with least used rooms', async () => {
    const wrapper = shallow(<BookedRoomsHOC {...props} />);
    props.dateValue = {
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    };
    const { dateValue } = props;

    await wrapper.instance().fetchMostAndLeastUsedRooms(dateValue);
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

    expect(wrapper.state()).toEqual({
      leastUsedRooms: leastUsedData,
      mostUsedRooms: mostUsedData,
      fetching: false,
      error: null,
    });
  });

  it('should update the state with an error when one occurs', async () => {
    mock.onPost(BASE_URL).reply(500);
    const wrapper = shallow(<BookedRoomsHOC {...props} />);
    await wrapper.instance().fetchMostAndLeastUsedRooms(props.date);
    expect(wrapper.state('error')).not.toBe(null);
  });

  it('should receive props as expected', () => {
    const wrapper = shallow(<BookedRoomsHOC {...props} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'fetchMostAndLeastUsedRooms');
    instance.componentWillReceiveProps(prevProps);
    expect(spy).toHaveBeenCalled();
  });
});
