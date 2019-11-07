import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import InputResources from '../../../../src/components/onboarding/addResources/InputResources';
import { ADD_RESOURCE_MUTATION } from '../../../../src/graphql/mutations/AddResourceToRoom';
import { GET_SPECIFIC_ROOMS } from '../../../../src/graphql/queries/Rooms';
import GET_ALL_LEVELS from '../../../../src/graphql/queries/Levels';

const mocks = [
  {
    request: {
      query: ADD_RESOURCE_MUTATION,
      variables: {
        name: ['pencil', 'dog'],
      },
    },
    result: {
      data: {
        createResource: {
          resource: {
            id: '2',
            name: 'pencil',
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_ALL_LEVELS,
    },
    result: {
      data: {
        allStructures: [{
          name: 'muhabura',
          tag: 'Rooms',
          locationId: '1234',
          parentId: '87523471234',
          parentTitle: 'hwqekrhfe314',
          level: '4',
          position: 'kigali',
          structureId: '327461084',
        }],
      },
    },
  },
  {
    request: {
      query: GET_SPECIFIC_ROOMS,
    },
    result: {
      data: {
        allRooms: {
          rooms: [{
            name: 'muhabura',
          }],
        },
      },
    },
  },
];

const event = { target: { name: 'pollName', value: 'spam' } };

const wrapper = mount(
  <MockedProvider mocks={mocks} addTypename={false}>
    <InputResources />
  </MockedProvider>,
);
it('update', async () => {
  await new Promise(resolve => setTimeout(resolve));
  wrapper.update();
});

it('update', async () => {
  await new Promise(resolve => setTimeout(resolve));
  wrapper.update();
});

it('Should test the component', () => {
  expect(wrapper).toMatchSnapshot();
});

it('Should test submit resource', () => {
  const submitResources = wrapper.find('#submit-resource');
  submitResources.forEach(submitResource => submitResource.props().onClick());
});

it('Should add new form input', () => {
  const inputResources = wrapper.find('#inputResources');
  inputResources.forEach((inputResource) => {
    inputResource.props().onChange(event);
    inputResource.props().icon && inputResource.props().icon.props.onClick();
  });
});

it('Should test handle submit resources', () => {
  const submitResources = wrapper.find('#handle-submit');
  submitResources.forEach(submitResource => submitResource
    .props().onClick({ preventDefault: jest.fn() }));
});
