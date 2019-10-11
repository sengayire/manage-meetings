import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import AddRooms from '../../../../src/components/onboarding/addResources/addRooms';
import { GET_SPECIFIC_ROOMS } from '../../../../src/graphql/queries/Rooms';

const mocks = [
  {
    request: {
      query: GET_SPECIFIC_ROOMS,
    },
    data: {
      allRooms: {
        rooms: [
          {
            id: '1',
            name: 'Buck',
            imageURL: 'bulldog',
          },
          {
            id: '2',
            name: 'Buck',
            imageURL: 'bulldog',
          },
        ],
      },
    },
  },
];
const wrapper = mount(
  <MockedProvider mocks={mocks} addTypename={false}>
    <AddRooms />
  </MockedProvider>,
);

it('SHOULD TEST THE COMPONENT', () => {
  expect(wrapper).toMatchSnapshot();
});
