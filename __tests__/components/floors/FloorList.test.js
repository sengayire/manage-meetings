/* eslint-disable import/extensions */
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import defaultUserRole from '../../../src/fixtures/user';
import FloorLists, { FloorList } from '../../../src/components/floors/FloorList';
import { GET_PAGINATED_FLOORS_QUERY } from '../../../src/graphql/queries/Floors';

describe('FloorList Component', () => {
  const floorListMocks = {
    request: {
      query: GET_PAGINATED_FLOORS_QUERY,
      variables: {
        page: 1,
        perPage: 5,
      },
    },
    result: {
      data: {
        allFloors: {
          pages: null,
          floors: [
            {
              id: '11',
              name: '2nd floor',
              blockId: 5,
              block: {
                name: 'Container',
                id: '5',
                offices: {
                  id: '2',
                },
              },
            },
          ],
          hasNext: true,
          hasPrevious: true,
        },
        errors: [
          {
            path: [
              'allFloors',
              'pages',
            ],
            locations: [
              {
                column: 5,
                line: 3,
              },
              {
                column: 7,
                line: 18,
              },
            ],
            message: "unsupported operand type(s) for /: 'Int' and 'int'",
          },
        ],
      },
    },
  };
  const initProps = {
    data: {
      fetchMore: jest.fn(() => Promise.resolve()),
      allFloors: {
        floors: [],
        hasNext: true,
        hasPrevious: false,
        pages: 10,
      },
      loading: false,
      refetch: jest.fn(),
    },
    user: {},
  };
  const wrapper = mount(
    <MockedProvider mocks={[floorListMocks]} addTypename={false}>
      <FloorLists user={defaultUserRole} {...initProps} />
    </MockedProvider>,
  );

  it('renders correctly from memory', async () => {
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Floor list', async () => {
    await wait(0);
  });

  it('should handle pagination', () => {
    const component = shallow(<FloorList user={defaultUserRole} {...initProps} />);
    component.instance().handleData();
    expect(component.state('dataFetched')).toBe(true);
    expect(component.state('isFetching')).toBe(true);
  });
});
