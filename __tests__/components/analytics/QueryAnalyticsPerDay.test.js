import React from 'react';
import wait from 'waait';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryAnalyticsPerDay, { QueryAnalyticsPerDailyPagination } from '../../../src/components/analytics/QueryAnalyticsPerDay';

import { ANALYTICS_MEETING_ROOM_PER_DAY } from '../../../src/graphql/queries/analytics';

describe('<QueryAnalyticsPerDay /> ', () => {
  it('should render without error', () => {
    renderer.create((
      <MockedProvider mocks={[]}>
        <QueryAnalyticsPerDay />
      </MockedProvider>
    ));
  });
  it('should render analytics data', async () => {
    const analyticsMock = {
      request: { query: ANALYTICS_MEETING_ROOM_PER_DAY },
      result: {
        data: {
          dailyDurationsOfMeetings: {
            MeetingsDurationaAnalytics: [
              {
                roomName: 'Tortuga',
                count: 2,
                totalDuration: 34,
              },
            ],
          },
        },
      },
    };
    const component = renderer.create((
      <MockedProvider mocks={[analyticsMock]} addTypename={false}>
        <QueryAnalyticsPerDay />
      </MockedProvider>
    ));
    await wait(0); // wait for response
    const tree = component.toJSON();
    expect(tree.children).toHaveLength(3);
  });
});

describe('QueryAnalyticsPerDailyPagination component', () => {
  const paginationWrapper = mount(<QueryAnalyticsPerDailyPagination />);
  it('should render without error', () => {
    paginationWrapper.find('#next').at(0).simulate('click');
    expect(paginationWrapper).toMatchSnapshot();
  });
});

