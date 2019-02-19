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
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_USER_QUERY } from '../../../src/graphql/queries/People';
import allUser from '../../../__mocks__/people/User';
import AnalyticsNav, { AnalyticsActivity as AnalyticComponent } from '../../../src/components/navbars/AnalyticsNav';
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
  const toggleMenu = jest.fn();
  let analyticNavWrapper;
  let analyticNav;
  let wrapper;
  const user = {
    user: {
      id: 8,
      location: 'Nairobi',
    },
  };
  beforeEach(() => {
    wrapper = mount(
      <ApolloProvider client={client}>
        <AnalyticsNav onClick={toggleMenu} onBlur={toggleMenu} />
      </ApolloProvider>,
    );
    const componentWrapper = shallow(<AnalyticComponent user={user} />);
    analyticNavWrapper = componentWrapper.instance();
    analyticNav = wrapper.find(AnalyticComponent).instance();
  });

  it('renders correctly from memory', () => {
    const mocks = [
      {
        request: {
          query: GET_USER_QUERY,
          variables: {
            email: 'sammy.muriuki@andela.com',
          },
        },
        result: { ...allUser },
      },
    ];

    const wrapperCode = (
      <MockedProvider mocks={mocks} addTypename={false}>
        <AnalyticsNav email="sammy.muriuki@andela.com" />
      </MockedProvider>
    );
    const mountWrapper = mount(wrapperCode);
    expect(mountWrapper).toMatchSnapshot();
  });

  it('should have 68 divs', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(60);
  });

  it('should have a calendar when calendar button is clicked', () => {
    analyticNav.setState({
      calenderOpen: true,
    });
    const CalendarButton = wrapper.find('#calendar-btn').at(0);
    expect(CalendarButton).toHaveLength(1);
    analyticNav.setState({
      calenderOpen: false,
    });
  });

  it('should have a button', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(4);
  });

  it('should call showOverview', () => {
    analyticNavWrapper.setState({
      view: 'overview',
      value: '',
    });
    const showOverview = jest.spyOn(analyticNavWrapper, 'showOverview');
    analyticNavWrapper.showOverview();
    expect(analyticNavWrapper.state.view).toEqual('overview');
    wrapper.update();
    expect(showOverview).toBeCalled();
  });

  it('should call showActivityView', () => {
    analyticNavWrapper.setState({
      view: 'activity',
    });
    const showActivityView = jest.spyOn(analyticNavWrapper, 'showActivityView');
    analyticNavWrapper.showActivityView();
    expect(analyticNavWrapper.state.view).toEqual('activity');
    wrapper.update();
    expect(showActivityView).toBeCalled();
  });

  it('should have a button', () => {
    analyticNavWrapper.setState({
      value: 'Today',
    });
    analyticNavWrapper.showActivityView();
    expect(analyticNavWrapper.state.value).toEqual('Today');
  });

  it('should show overViewIcon', () => {
    analyticNav.setState({
      view: 'overview',
      value: '',
    });
    wrapper.update();
    const overviewSpan = wrapper.find('#overview-span');
    expect(overviewSpan).toHaveLength(1);
  });

  it('should show activityIcon', () => {
    analyticNav.setState({
      view: 'overview',
      value: '',
    });
    wrapper.update();
    const activitySpan = wrapper.find('#activity-span');
    expect(activitySpan).toHaveLength(1);
  });

  it('should call toggleMenu at onClick', () => {
    analyticNav.setState({ menuOpen: false, fetching: false });
    wrapper.update();
    const dropBtn = wrapper.find('#btnControl');
    dropBtn.simulate('click');
    expect(analyticNav.state.menuOpen).toEqual(true);
  });

  it('should call sendDateData', () => {
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.endDate).toEqual('06 Nov 2018');
  });
  it('should call calendarToggle at onClick', () => {
    analyticNav.setState({ calenderOpen: true });
    const calendarBtn = wrapper.find('#calendar-btn').at(0);
    calendarBtn.simulate('click');
    expect(analyticNav.state.calenderOpen).toEqual(false);
  });
});

describe('AnalyticsNav state and download', () => {
  const user = {
    user: {
      id: 8,
      location: 'Nairobi',
    },
  };

  it('should update the state with least and most used rooms', async () => {
    const wrapper = shallow(<AnalyticComponent user={user} />);
    wrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    await wrapper.instance().fetchMostAndLeastUsedRooms();
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
    expect(wrapper.state().leastUsedRooms).toEqual(leastUsedData);
    expect(wrapper.state().mostUsedRooms).toEqual(mostUsedData);
  });

  it('should call downloadCSV', async () => {
    const wrapper = shallow(<AnalyticComponent user={user} />);
    wrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    const downloadCSV = jest.spyOn(wrapper.instance(), 'downloadCSV');
    wrapper.update();
    await wrapper.instance().fetchMostAndLeastUsedRooms();
    wrapper.instance().downloadCSV();
    expect(downloadCSV).toBeCalled();
  });

  it('should call fetchDownload with pdf', async () => {
    const wrapper = shallow(<AnalyticComponent user={user} />);
    wrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    const fetchDownload = jest.spyOn(wrapper.instance(), 'fetchDownload');
    wrapper.update();
    await wrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await wrapper.instance().downloadPdf('pdf');
    expect(fetchDownload).toBeCalledWith('pdf');
  });

  it('should call fetchDownload with jpeg', async () => {
    const wrapper = shallow(<AnalyticComponent user={user} />);
    wrapper.setState({
      startDate: 'Nov 05 2018',
      endDate: 'Nov 06 2018',
    });
    const fetchDownload = jest.spyOn(wrapper.instance(), 'fetchDownload');
    wrapper.update();
    await wrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await wrapper.instance().downloadJpeg('jpeg');
    expect(fetchDownload).toBeCalledWith('jpeg');
  });

  it('should set state of least and most booked rooms to null when response is empty', async () => {
    mock.onPost(BASE_URL).reply(200, {});
    const wrapper = shallow(<AnalyticComponent user={user} />);
    await wrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await wrapper.instance().downloadJpeg('jpeg');
    expect(wrapper.state().leastUsedRooms).toEqual([]);
    expect(wrapper.state().mostUsedRooms).toEqual([]);
  });

  it('should not crash when least and most booked rooms are empty', async () => {
    mock.onPost(BASE_URL).reply(200, {});
    const wrapper = shallow(<AnalyticComponent user={user} />);
    await wrapper.instance().fetchMostAndLeastUsedRooms();
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    await wrapper.instance().downloadCSV();
    expect(wrapper.state().leastUsedRooms).toEqual([]);
    expect(wrapper.state().mostUsedRooms).toEqual([]);
  });

  it('should set error state when an error occurs', async () => {
    mock.onPost(BASE_URL).reply(500);
    const wrapper = shallow(<AnalyticComponent user={user} />);
    await wrapper.instance().fetchMostAndLeastUsedRooms();
    expect(wrapper.state('error')).not.toBe(null);
  });
});
