import { ANALYTICS_BOOKINGS_COUNT } from '../../src/graphql/queries/analytics';
import { getTodaysDate } from '../../src/utils/Utilities';

export const queryBookingsCountMockData = [
  {
    request: {
      query: ANALYTICS_BOOKINGS_COUNT,
      variables: {
        startDate: getTodaysDate(),
        endDate: getTodaysDate(),
      },
      result: {
        data: [],
        errors: null,
      },
    },
  },
];

export const queryBookingsCountMocksData = {
  request: {
    query: ANALYTICS_BOOKINGS_COUNT,
    variables: { startDate: 'Nov 01 2018', endDate: 'Nov 03 2018' },
  },
  result: {
    data: {
      bookingsAnalyticsCount: [
        {
          period: 'Nov 01 2018',
          bookings: 21,
        },
        {
          period: 'Nov 02 2018',
          bookings: 30,
        },
        {
          period: 'Nov 03 2018',
          bookings: 33,
        },
      ],
    },
    errors: null,
  },
};

export const queryAllRoomsCapacity = {
  betweenTenandTwentyData: 0,
  greaterThanTwentyData: 0,
  lessThanTenData: 100,
};
