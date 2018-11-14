import React from 'react';
import { mount } from 'enzyme';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
// eslint-disable-next-line import/extensions
import fetch from 'unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

import AnalyticsNav from '../../../src/components/navbars/AnalyticsNav';


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

  const wrapper = mount(
    <ApolloProvider client={client}>
      <AnalyticsNav onClick={toggleMenu} onBlur={toggleMenu} />
    </ApolloProvider>,
  );

  const analyticNavWrapper = wrapper.find(AnalyticsNav).instance();

  it('should have a div', () => {
    const div = wrapper.find('div');
    expect(div).toHaveLength(49);
  });

  it('should have a calendar when calendar button is clicked', () => {
    analyticNavWrapper.setState({
      calenderOpen: true,
    });
    const CalendarButton = wrapper.find('#calendar-btn').at(0);
    expect(CalendarButton).toHaveLength(1);
    analyticNavWrapper.setState({
      calenderOpen: false,
    });
  });

  it('should have a button', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(5);
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

  it('should update value state', () => {
    analyticNavWrapper.setState({
      value: 'Today',
    });

    analyticNavWrapper.showActivityView();
    expect(analyticNavWrapper.state.value).toEqual('Today');
  });

  it('should show overViewIcon', () => {
    analyticNavWrapper.setState({
      view: 'overview',
      value: '',
    });
    wrapper.update();
    const overviewSpan = wrapper.find('#overview-span');
    expect(overviewSpan).toHaveLength(1);
  });

  it('should show activityIcon', () => {
    analyticNavWrapper.setState({
      view: 'overview',
      value: '',
    });
    wrapper.update();
    const activitySpan = wrapper.find('#activity-span');
    expect(activitySpan).toHaveLength(1);
  });

  it('should call toggleMenu at onClick', () => {
    analyticNavWrapper.setState({ menuOpen: false });
    const dropBtn = wrapper.find('#btnControl');
    dropBtn.simulate('click');
    expect(analyticNavWrapper.state.menuOpen).toEqual(true);
  });
  it('should call sendDateData', () => {
    analyticNavWrapper.sendDateData('05 Nov 2018', '06 Nov 2018');
    expect(analyticNavWrapper.state.endDate).toEqual('06 Nov 2018');
  });
  it('should call toggleMenu at onBlur', () => {
    analyticNavWrapper.setState({ menuOpen: true });
    const dropBtn = wrapper.find('#btnControl');
    dropBtn.simulate('blur');
    expect(analyticNavWrapper.state.menuOpen).toEqual(false);
  });
  it('should call calendarToggle at onClick', () => {
    analyticNavWrapper.setState({ calenderOpen: true });
    const calendarBtn = wrapper.find('#calendar-btn').at(0);
    calendarBtn.simulate('click');
    expect(analyticNavWrapper.state.calenderOpen).toEqual(false);
  });
});
