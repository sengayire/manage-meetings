import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryLeastBookedRooms from '../../../src/components/analytics/QueryLeastBookedRooms';
import { LEAST_BOOKED_ROOMS_ANALYTICS } from '../../../src/graphql/queries/analytics';
import roomUsage from '../../../__mocks__/rooms/mostUsedRooms';

const mock =
  [{
    request: {
      query: LEAST_BOOKED_ROOMS_ANALYTICS,
      variables: { startDate: 'Nov 01 2018', endDate: 'Nov 01 2018' },
    },
    result: {
      data: {
        analyticsForLeastBookedRooms: {
          analytics: roomUsage,
        },
      },
      error: null,
    },
  }];

describe('Query Least Booked Rooms Component', () => {
  const props = {
    dateValue: {
      startDate: 'Nov 01 2018',
      endDate: 'Nov 01 2018',
    },
  };

  it('should load progressBar', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mock} addTypename={false}>
        <QueryLeastBookedRooms {...props} />
      </MockedProvider>,
    );
    await wait(0);
    expect(wrapper.find('ThemedProgressBar')).toHaveLength(1);
  });
});
