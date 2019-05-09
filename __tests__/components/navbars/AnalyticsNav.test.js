/* eslint-disable import/no-named-as-default */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// eslint-disable-next-line import/extensions
import { InMemoryCache } from 'apollo-cache-inmemory';
import AnalyticsNav, { AnalyticsNav as AnalyticComponent } from '../../../src/components/navbars/AnalyticsNav';
import AnalyticsActivity from '../../../src/containers/AnalyticsActivity';
import AnalyticsOverview from '../../../src/containers/AnalyticsOverview';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';
import mockDataForAnalytics from '../../../__mocks__/analytics/mockAnalyticsDataState';

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
global.URL.createObjectURL = jest.fn();

const props = {
  leastBookedAnalytics: {
    loading: false,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForBookedRooms: { analytics: roomUsage },
  },
  mostBookedAnalytics: {
    loading: false,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForBookedRooms: { analytics: roomUsage },
  },
  dateValue: {
    startDate: 'start date',
    endDate: 'end date',
  },
  client: { query: jest.fn().mockImplementationOnce(() => Promise.resolve({ user: 'user' })) },
};

describe('AnalyticsNav Component', () => {
  const user = {
    user: {
      location: 'Kampala',
    },
  };
  let analyticNavWrapper;
  let wrapper;
  let componentWrapper;

  beforeEach(() => {
    wrapper = mount(
      <ApolloProvider client={client}>
        <AnalyticsNav user={user} {...props} />
      </ApolloProvider>,
    );
    componentWrapper = shallow(<AnalyticComponent user={user} {...props} />);
    analyticNavWrapper = componentWrapper.instance();
  });

  it('should render the AnalyticsOverview with length of 1', () => {
    expect(wrapper.find(AnalyticsOverview).length).toEqual(1);
  });

  it('should render the AnalyticsActivity with length of 1', () => {
    wrapper.find('.activityIconBtn').simulate('click');
    expect(wrapper.find(AnalyticsActivity).length).toEqual(1);
  });

  it('should display the location of the user', () => {
    expect(wrapper.find('.location-btn').text()).toEqual('Fetching location...');
  });

  it('should call sendDateData once and update the state value of start and end date', () => {
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.endDate).toEqual('06 Nov 2018');
    expect(analyticNavWrapper.state.startDate).toEqual('05 Nov 2018');
  });

  it('should update isFutureDateSelected to true when a future date is selected', () => {
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2020');
    expect(analyticNavWrapper.state.isFutureDateSelected).toEqual(true);
  });
});

describe('AnalyticsNav state and download', () => {
  const user = {
    user: {
      id: 8,
      location: 'Nairobi',
    },
  };
  const wrapper = shallow(<AnalyticComponent user={user} client={{ query: jest.fn() }} />);
  wrapper.setState({
    ...mockDataForAnalytics,
  });

  it('should update the state with least and most used rooms', () => {
    expect(wrapper.state().leastBookedRooms).toEqual(mockDataForAnalytics.leastBookedRooms);
    expect(wrapper.state().mostBookedRooms).toEqual(mockDataForAnalytics.mostBookedRooms);
  });

  it('should show the calendar when all three components have finish loading', () => {
    wrapper.setState({ componentsDoneLoading: ['component1', 'component2', 'component3'] });
    expect(wrapper.find('Calendar').length).toEqual(1);
  });

  it('should call downloadCSV', () => {
    const downloadCSV = jest.spyOn(wrapper.instance(), 'downloadCSV');
    wrapper.instance().downloadCSV();
    expect(downloadCSV).toBeCalled();
  });

  it('should call fetchDownload with pdf', () => {
    const fetchDownload = jest.spyOn(wrapper.instance(), 'fetchDownload');
    html2canvas.mockImplementation(() =>
      Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }),
    );
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    wrapper.instance().downloadPdf('pdf');
    expect(fetchDownload).toBeCalledWith('pdf');
  });

  it('should call fetchDownload with jpeg', () => {
    const fetchDownload = jest.spyOn(wrapper.instance(), 'fetchDownload');
    html2canvas.mockImplementation(() =>
      Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }),
    );
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    wrapper.instance().downloadJpeg('jpeg');
    expect(fetchDownload).toBeCalledWith('jpeg');
  });
});
