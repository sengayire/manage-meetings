import React from 'react';
import wait from 'waait';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryAnalyticsPerMeetingRoom, { QueryAnalyticsPerMeetingRoomPagination } from '../../../src/components/analytics/QueryAnalyticsPerMeetingRoom';
import MEETING_DURATION_ANALYTICS from '../../../src/graphql/queries/analytics';
import { getTodaysDate } from '../../../src/utils/Utilities';

const props = {
  dateValue: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
};

const analyticsMocks = [
  {
    request: {
      query: MEETING_DURATION_ANALYTICS,
      variables: {
        startDate: getTodaysDate(),
        enddate: getTodaysDate(),
      },
      result: {
        data: [],
      },
    },
  },
];

describe('QueryAnalyticsPerMonth component', () => {
  it('should render without error', () => {
    renderer.create(
      <MockedProvider mocks={analyticsMocks}>
        <QueryAnalyticsPerMeetingRoom {...props} />
      </MockedProvider>,
    );
  });
});

describe('QueryAnalyticsPerMonthPagination component', () => {
  const paginationWrapper = mount(<QueryAnalyticsPerMeetingRoomPagination />);
  it('should click next', () => {
    paginationWrapper
      .find('#next')
      .at(0)
      .simulate('click');
    expect(paginationWrapper).toMatchSnapshot();
  });
});

it('should render analytics data', async () => {
  const analyticsMock = {
    request: {
      query: MEETING_DURATION_ANALYTICS,
      variables: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
    },
    result: {
      data: {
        analyticsForMeetingsDurations: {
          MeetingsDurationaAnalytics: [
            {
              roomName: 'Tortuga',
              count: 1,
              totalDuration: 61,
            },
            {
              roomName: 'Accra',
              count: 7,
              totalDuration: 330,
            },
          ],
        },
      },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[analyticsMock]} addTypename={false}>
      <QueryAnalyticsPerMeetingRoom {...props} />
    </MockedProvider>,
  );

  await wait(0); // wait for response
  // Expect the component to have three childeren below, ie,the table rows.
  expect(component.toJSON()[0].children).toHaveLength(3);
});
