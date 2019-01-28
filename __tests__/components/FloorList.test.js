import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { GET_PAGINATED_FLOORS_QUERY } from '../../src/graphql/queries/Floors';
import FloorLists, { FloorList } from '../../src/components/FloorList';

describe('RoomList Component', () => {
  const floorListMocks = {
    request: {
      query: GET_PAGINATED_FLOORS_QUERY,
      variables: {
        page: 1,
        perPage: 50,
      },
    },
    result: {
      data: {
        allFloors: {
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
        },
      },
    },
  };
  const initProps = {
    handleData: jest.fn(),
    data: {
      fetchMore: jest.fn(),
      allFloors: {},
      loading: false,
      error: '',
      refetch: jest.fn(),
    },
  };
  const wrapper = mount(
    <MockedProvider mocks={[floorListMocks]} addTypename={false}>
      <FloorLists {...initProps} />
    </MockedProvider>,
  );

  it('renders correctly from memory', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Floor list', async () => {
    await wait(0);
    expect(wrapper.length).toBe(1);
  });

  it('renders an error in case one occurs', () => {
    const props = {
      handleData: jest.fn(),
      data: {
        fetchMore: jest.fn(),
        allFloors: {},
        loading: false,
        error: { error: 'an error has occured' },
        refetch: jest.fn(),
      },
    };
    const errorWrapper = shallow(<FloorList {...props} />);
    expect(errorWrapper.html()).toContain('<div></div>');
  });
});
