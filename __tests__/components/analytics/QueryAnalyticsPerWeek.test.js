import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryAnalyticsPerWeek, { QueryAnalyticsPerWeekPagination } from '../../../src/components/analytics/QueryAnalyticsPerWeek';
import { ANALYTICS_MEETING_ROOM_PER_WEEK } from '../../../src/graphql/queries/analytics';

describe('<QueryAnalyticsPerMonth /> ', () => {
  it('should render without error', () => {
    renderer.create((
      <MockedProvider mocks={[]}>
        <QueryAnalyticsPerWeek />
      </MockedProvider>
    ));
  });

  it('should render analytics data', async () => {
    const analyticsMock = {
      request: { query: ANALYTICS_MEETING_ROOM_PER_WEEK },
      result: {
        data: {
          weeklyDurationsOfMeetings: {
            MeetingsDurationaAnalytics: [
              {
                roomName: 'Accra',
                count: 12,
                totalDuration: 670,
              },
            ],
          },
        },
      },
    };

    const component = renderer.create((
      <MockedProvider mocks={[analyticsMock]} addTypename={false}>
        <QueryAnalyticsPerWeek />
      </MockedProvider>
    ));

    await wait(0); // wait for response

    const tree = component.toJSON();
    expect(tree.children).toHaveLength(3);
  });
});

describe('QueryAnalyticsPerWeekPagination component', () => {
  const paginationWrapper = mount(<QueryAnalyticsPerWeekPagination />);
  it('should render without error', () => {
    paginationWrapper.find('#next').at(0).simulate('click');
    expect(paginationWrapper).toMatchSnapshot();
  });
});
