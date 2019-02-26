import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { MOST_BOOKED_ROOMS_ANALYTICS } from '../../../src/graphql/queries/analytics';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';
import QueryMostBookedRooms from '../../../src/components/analytics/QueryMostBookedRooms';

const mock =
  [{
    request: {
      query: MOST_BOOKED_ROOMS_ANALYTICS,
      variables: { startDate: 'Nov 01 2018', endDate: 'Nov 01 2018' },
    },
    result: {
      data: {
        analyticsForMostBookedRooms: {
          analytics: roomUsage,
        },
      },
      error: null,
    },
  }];

describe('Query Most Booked Rooms Component', () => {
  const props = {
    dateValue: {
      startDate: 'Nov 01 2018',
      endDate: 'Nov 01 2018',
    },
  };

  it('should load progressBar', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mock} addTypename={false}>
        <QueryMostBookedRooms {...props} />
      </MockedProvider>,
    );
    await wait(0);
    expect(wrapper.find('ThemedProgressBar')).toHaveLength(1);
  });
});
