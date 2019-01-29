import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import wait from 'waait';
import GET_FLOORS_QUERY from '../../../src/graphql/queries/Floors';
import FloorLists from '../../../src/components/floors/FloorList';

describe('RoomList Component', () => {
  const floorListMocks = {
    request: { query: GET_FLOORS_QUERY },
    result: {
      data: {
        allFloors: [
          {
            id: '1',
            name: 'fouth floor ',
            blockId: 1,
            block: {
              id: '1',
              name: 'Epic Towers',
              offices: {
                name: 'The Dojo 2',
              },
            },
          },
        ],
      },
    },
  };
  const floorListErrorMocks = {
    request: { query: GET_FLOORS_QUERY },
    error: { message: 'An error occured' },
  };
  const initProps = {
    handleData: jest.fn(),
    data: {
      fetchMore: jest.fn(),
      allFloors: [],
      loading: false,
      error: undefined,
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
  });
  it('renders an error in case one occurs', async () => {
    const errorWrapper = mount(
      <MockedProvider mocks={[floorListErrorMocks]} addTypename={false}>
        <FloorLists {...initProps} />
      </MockedProvider>,
    );
    await wait(0);
    expect(errorWrapper.html()).toContain('An error occured');
  });
});
