/* eslint-disable import/no-named-as-default */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// eslint-disable-next-line import/extensions
import fetch from 'unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AnalyticsNav, { AnalyticsNav as AnalyticComponent } from '../../../src/components/navbars/AnalyticsNav';
import AnalyticsActivity from '../../../src/containers/AnalyticsActivity';
import AnalyticsOverview from '../../../src/containers/AnalyticsOverview';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';

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

const props = {
  leastBookedAnalytics: {
    loading: false,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForLeastBookedRooms: { analytics: roomUsage },
  },
  mostBookedAnalytics: {
    loading: false,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForMostBookedRooms: { analytics: roomUsage },
  },
};

const newProps = {
  leastBookedAnalytics: {
    loading: true,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForLeastBookedRooms: { analytics: roomUsage },
  },
  mostBookedAnalytics: {
    loading: true,
    refetch: jest.fn(() => new Promise(resolve => resolve())),
    analyticsForMostBookedRooms: { analytics: roomUsage },
  },
};

describe('AnalyticsNav Component', () => {
  const user = {
    user: {
      location: 'Kampala',
    },
  };
  let analyticNavWrapper;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ApolloProvider client={client}>
        <AnalyticsNav user={user} />
      </ApolloProvider>,
    );
    const componentWrapper = shallow(<AnalyticComponent
      user={user}
      {...props}
    />);
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
    expect(wrapper.find('.location-btn').text()).toEqual('Kampala');
  });

  it('should call sendDateData once and update the state value of start and end date', () => {
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.endDate).toEqual('06 Nov 2018');
    expect(analyticNavWrapper.state.startDate).toEqual('05 Nov 2018');
  });
});

describe('AnalyticsNav state and download', () => {
  const user = {
    user: {
      id: 8,
      location: 'Nairobi',
    },
  };

  it('should update the state with least and most used rooms', () => {
    const wrapper = shallow(<AnalyticComponent
      user={user}
      leastBookedAnalytics={props}
      mostBookedAnalytics={props}
    />);
    wrapper.instance().componentWillReceiveProps({ ...props });
    const leastBookedRoomsData = roomUsage;
    const mostBokedRoomsData = roomUsage;
    expect(wrapper.state().leastBookedRooms).toEqual(leastBookedRoomsData);
    expect(wrapper.state().mostBookedRooms).toEqual(mostBokedRoomsData);
  });

  it('should keep state for least and most used rooms as null', () => {
    const wrapper = shallow(<AnalyticComponent
      user={user}
      leastBookedAnalytics={props}
      mostBookedAnalytics={props}
    />);
    wrapper.setState({
      leastBookedRooms: [],
      mostBookedRooms: [],
    });
    wrapper.update();
    wrapper.instance().componentWillReceiveProps({ ...newProps });
    expect(wrapper.state().leastBookedRooms).toEqual([]);
    expect(wrapper.state().mostBookedRooms).toEqual([]);
  });

  it('should call downloadCSV', () => {
    const wrapper = shallow(<AnalyticComponent
      user={user}
      leastBookedAnalytics={props}
      mostBookedAnalytics={props}
    />);
    const downloadCSV = jest.spyOn(wrapper.instance(), 'downloadCSV');
    wrapper.instance().componentWillReceiveProps({ ...props });
    wrapper.instance().downloadCSV();
    expect(downloadCSV).toBeCalled();
  });

  it('should call fetchDownload with pdf', () => {
    const wrapper = shallow(<AnalyticComponent
      user={user}
      leastBookedAnalytics={props}
      mostBookedAnalytics={props}
    />);
    wrapper.instance().componentWillReceiveProps({ ...props });
    const fetchDownload = jest.spyOn(wrapper.instance(), 'fetchDownload');
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    wrapper.instance().downloadPdf('pdf');
    expect(fetchDownload).toBeCalledWith('pdf');
  });

  it('should call fetchDownload with jpeg', () => {
    const wrapper = shallow(<AnalyticComponent
      user={user}
      leastBookedAnalytics={props}
      mostBookedAnalytics={props}
    />);
    const fetchDownload = jest.spyOn(wrapper.instance(), 'fetchDownload');
    wrapper.instance().componentWillReceiveProps({ ...props });
    html2canvas.mockImplementation(() => Promise.resolve({ data: { data: '<p>test</p>' }, toDataURL: jest.fn() }));
    jsPDF.mockImplementation(() => ({ save: jest.fn(), addImage: jest.fn() }));
    wrapper.instance().downloadJpeg('jpeg');
    expect(fetchDownload).toBeCalledWith('jpeg');
  });
});
