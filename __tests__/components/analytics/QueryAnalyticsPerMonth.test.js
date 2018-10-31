import React from 'react';
import wait from 'waait';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryAnalyticsPerMonth, { QueryAnalyticsPerMonthPagination } from '../../../src/components/analytics/QueryAnalyticsPerMonth';
import ANALYTICS_MEETING_ROOM_PER_MONTH from '../../../src/graphql/queries/analytics';


describe('QueryAnalyticsPerMonth component', () => {
  it('should render without error', () => {
    renderer.create((
      <MockedProvider mocks={[]}>
        <QueryAnalyticsPerMonth />
      </MockedProvider>
    ));
  });

  it('should render analytics data', async () => {
    const analyticsMock = {
      request: { query: ANALYTICS_MEETING_ROOM_PER_MONTH },
      result: {
        data: {
          monthlyDurationsOfMeetings: {
            MeetingsDurationaAnalytics: [
              {
                roomName: 'Tortuga',
                count: 1,
                totalDuration: 61,
              },
            ],
          },
        },
      },
    };

    const component = renderer.create((
      <MockedProvider mocks={[analyticsMock]} addTypename={false}>
        <QueryAnalyticsPerMonth />
      </MockedProvider>
    ));

    await wait(0); // wait for response

    const tree = component.toJSON();
    expect(tree.children).toHaveLength(3);
  });
});

describe('QueryAnalyticsPerMonthPagination component', () => {
  const paginationWrapper = mount(<QueryAnalyticsPerMonthPagination />);
  it('should click next', () => {
    paginationWrapper.find('#next').at(0).simulate('click');
    expect(paginationWrapper).toMatchSnapshot();
  });
});

