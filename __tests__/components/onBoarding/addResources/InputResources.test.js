import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import InputResources from '../../../../src/components/onboarding/addResources/InputResources';
import { ADD_RESOURCE_MUTATION } from '../../../../src/graphql/mutations/AddResourceToRoom';

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
];

let inputResources = '';
const resources = ['first', 'second', 'third'];

const event = { target: { name: 'pollName', value: 'spam' } };

const state = {
  resources,
  resource: '',
};

const wrapper = mount(
  <MockedProvider mocks={mocks}>
    <InputResources />
  </MockedProvider>,
);

it('SHOULD TEST THE COMPONENT', () => {
  expect(wrapper).toMatchSnapshot();
});

it(' SHOULD ADD INPUT FIELD', () => {
  wrapper.setState(state);
  inputResources = wrapper.find('Input[name="inputResources"]');
  inputResources.forEach((inputResource) => {
    inputResource.simulate('change', event);
    const {
      icon: { props },
    } = inputResource.props();
    props.onClick();
  });
});

it('SHOULD ADD NEW FORM INPUT', () => {
  wrapper
    .find('#submit-resource')
    .at(0)
    .simulate('click');
});

it('SHOULD SUBMIT RESOURCES', () => {
  wrapper
    .find('#handle-submit')
    .at(2)
    .simulate('click');
});

it('SHOULD CALL ONCHANGE', () => {
  wrapper
    .find('#inputResources')
    .at(1)
    .props()
    .onChange({ target: { value: 'pencil' } });
});
