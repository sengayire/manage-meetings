import React from 'react';
import fileDownload from 'js-file-download';
import { mount, shallow } from 'enzyme';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
// eslint-disable-next-line import/extensions
import fetch from 'unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_USER_QUERY } from '../../../src/graphql/queries/People';
import allUser from '../../../__mocks__/people/User';
import AnalyticsNav, { AnalyticsActivity as AnalyticComponent } from '../../../src/components/navbars/AnalyticsNav';
import getCSVData from '../../../src/json_requests/getCSVData';


jest.mock('../../../src/json_requests/getCSVData');
jest.mock('js-file-download');


const { MRM_API_URL } = process.env || {};

const httpLink = createHttpLink({
  uri: MRM_API_URL,
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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

  it('should have a div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(53);
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
    expect(button).toHaveLength(7);
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
    analyticNav.setState({ menuOpen: false });
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


describe('CSV functionality', () => {
  const user = {
    user: {
      id: 8,
      location: 'Nairobi',
    },
  };
  getCSVData.mockImplementation(() => Promise.resolve());
  getCSVData.mockResolvedValue(() => Promise.resolve());
  it('should hit csv fetch functionality', () => {
    const wrapper = shallow(<AnalyticComponent user={user} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'fetchCSVData');
    spy();
    expect(getCSVData).toHaveBeenCalled();
    Promise.resolve().then(() => {
      expect(fileDownload).toHaveBeenCalled();
    });
  });

  it('should catch error from server', () => {
    getCSVData.mockImplementation(() => Promise.reject());
    const wrapper = shallow(<AnalyticComponent user={user} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'fetchCSVData');
    spy();
    expect(getCSVData).toHaveBeenCalled();
  });
});

