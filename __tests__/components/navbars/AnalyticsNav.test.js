import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// eslint-disable-next-line import/extensions
import fetch from 'unfetch';
import MockAdapter from 'axios-mock-adapter';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AnalyticsNav } from '../../../src/components/navbars/AnalyticsNav';
import AnalyticsActivity from '../../../src/containers/AnalyticsActivity';
import AnalyticsOverview from '../../../src/containers/AnalyticsOverview';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';
import { apiRequest } from '../../../src/json_requests';

jest.mock('html2canvas');
jest.mock('jspdf');
const { MRM_API_URL } = process.env || {};
const httpLink = createHttpLink({
  uri: MRM_API_URL,
  fetch,
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const mock = new MockAdapter(apiRequest);
const { BASE_URL } = process.env || '';
const response = roomUsage;
mock.onPost(BASE_URL).reply(200, response);

describe('AnalyticsNav Component', () => {
  const user = {
    user: {
      location: 'Nairobi',
    },
  };

  const wrapper = mount(
    <ApolloProvider client={client}>
      <AnalyticsNav user={user} />
    </ApolloProvider>,
  );

  const shallowWrapper = shallow(<AnalyticsNav user={user} />);
  const shallowInstance = shallowWrapper.instance();

  it('should render the AnalyticsOverview with length of 1', () => {
    expect(wrapper.find(AnalyticsOverview).length).toEqual(1);
  });

  it('should render the AnalyticsActivity with length of 1', () => {
    wrapper.find('.activityIconBtn').simulate('click');
    expect(wrapper.find(AnalyticsActivity).length).toEqual(1);
  });

  it('should display the location of the user', () => {
    expect(wrapper.find('.location-btn').text()).toEqual('Nairobi');
  });

  it('should call sendDateData once and update the state value of start and end date', () => {
    shallowInstance.sendDateData('05 Nov 2018', '06 Nov 2018');

    expect(shallowInstance.state.endDate).toEqual('06 Nov 2018');
    expect(shallowInstance.state.startDate).toEqual('05 Nov 2018');
  });
});

describe('AnalyticsNav state and download', () => {
  const user = {
    user: {
      id: 8,
      location: 'Nairobi',
    },
  };
  const shallowWrapper = shallow(<AnalyticsNav user={user} />);

  it('should update the state with least and most used rooms', async () => {
    shallowWrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    await shallowWrapper.instance().fetchMostAndLeastUsedRooms();
    const rooms = response['Least Used Rooms'].Room;
    const meetings = response['Least Used Rooms'].Meetings;
    const meetingShares = response['Least Used Rooms']['% Share of All Meetings'];
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
    expect(shallowWrapper.state().leastUsedRooms).toEqual(leastUsedData);
    expect(shallowWrapper.state().mostUsedRooms).toEqual(mostUsedData);
  });

  it('should call downloadCSV', async () => {
    shallowWrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    const downloadCSV = jest.spyOn(shallowWrapper.instance(), 'downloadCSV');
    shallowWrapper.update();
    await shallowWrapper.instance().fetchMostAndLeastUsedRooms();
    shallowWrapper.instance().downloadCSV();
    expect(downloadCSV).toBeCalled();
  });

  it('should call fetchDownload with pdf', async () => {
    shallowWrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    const fetchDownload = jest.spyOn(shallowWrapper.instance(), 'fetchDownload');
    shallowWrapper.update();
    await shallowWrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await shallowWrapper.instance().downloadPdf('pdf');

    expect(fetchDownload).toBeCalledWith('pdf');
  });

  it('should call fetchDownload with jpeg', async () => {
    shallowWrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    const fetchDownload = jest.spyOn(shallowWrapper.instance(), 'fetchDownload');
    shallowWrapper.update();
    await shallowWrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await shallowWrapper.instance().downloadJpeg('jpeg');

    expect(fetchDownload).toBeCalledWith('jpeg');
  });

  it('should set state of least and most booked rooms to null when response is empty', async () => {
    const newWrapper = shallow(<AnalyticsNav user={user} />);
    mock.onPost(BASE_URL).reply(200, {});
    await newWrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await newWrapper.instance().downloadJpeg('jpeg');

    expect(newWrapper.state().leastUsedRooms).toEqual([]);
    expect(newWrapper.state().mostUsedRooms).toEqual([]);
  });

  it('should not crash when least and most booked rooms are empty', async () => {
    const newWrapper = shallow(<AnalyticsNav user={user} />);
    mock.onPost(BASE_URL).reply(200, {});
    await newWrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await newWrapper.instance().downloadCSV();

    expect(newWrapper.state().leastUsedRooms).toEqual([]);
    expect(newWrapper.state().mostUsedRooms).toEqual([]);
  });

  it('should set error state when an error occurs', async () => {
    mock.onPost(BASE_URL).reply(500);
    await shallowWrapper.instance().fetchMostAndLeastUsedRooms();
    expect(shallowWrapper.state('error')).not.toBe(null);
  });
});
