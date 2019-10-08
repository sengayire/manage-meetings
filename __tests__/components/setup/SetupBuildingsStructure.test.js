import React from 'react';
import { mount } from 'enzyme';
import uuid from 'uuid';
import { MockedProvider } from '@apollo/react-testing';
import SetupBuildingsStructure from '../../../src/components/onboarding/BuildingsSetup/SetupBuildingsStructure';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../src/graphql/mutations/Preview';
import * as userLocation from '../../../src/components/helpers/QueriesHelpers';

jest.mock('uuid');
describe('Setup room structure component', () => {
  it('should render properly', () => {
    expect(<SetupBuildingsStructure />).toMatchSnapshot();
  });
  const textInputs = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });
  const mocks = [{
    request: {
      query: ADD_LEVEL_SETUP_MUTATION,
      variables: {
        flattenedData: [{
          structureId: '40138b44-1072-4720-989f-0e8631f83637',
          level: 1,
          name: 'Muhabura',
          tag: 'buildings',
          locationId: 233,
          position: 0,
        }, {
          structureId: '3c85bc4b-7e12-48f8-b6dc-1bf22e86aa63',
          level: 1,
          name: 'sabyinyo',
          tag: 'buildings',
          locationId: 233,
          position: 1,
        }],
      },
    },
    result: {
      data: {
        createOfficeStructure: {
          structure: [{
            structureId: '40138b44-1072-4720-989f-0e8631f83637',
            level: 1,
            name: 'Muhabura',
            tag: 'buildings',
            locationId: 233,
            position: 0,
          }, {
            structureId: '3c85bc4b-7e12-48f8-b6dc-1bf22e86aa63',
            level: 1,
            name: 'sabyinyo',
            tag: 'buildings',
            locationId: 233,
            position: 1,
          }],
        },
      },
    },
  },
  ];

  it('should not send data when center_name is not provided', () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false} >
        <SetupBuildingsStructure />
      </MockedProvider>);
    jest.spyOn(userLocation, 'getUserLocation');
    wrapper.find('.onboarding-next-button').simulate('click');
    expect(userLocation.getUserLocation).not.toHaveBeenCalled();
  });

  it('should not send data when buildings names are not valid', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false} >
        <SetupBuildingsStructure />
      </MockedProvider>);
    jest.spyOn(userLocation, 'getUserLocation').mockImplementation(() => ({ id: 233 }));
    uuid.mockImplementationOnce(() => '40138b44-1072-4720-989f-0e8631f83637')
      .mockImplementationOnce(() => '3c85bc4b-7e12-48f8-b6dc-1bf22e86aa63');
    wrapper.find('InputField').find('Input').props().onChange(textInputs('center_name', 'epiccs'));
    wrapper.find('SingleInputWithAddIcon').props().onTextChange(textInputs('building_name_1', 'Muhabura'));
    wrapper.find('SingleInputWithAddIcon').props().onTextChange(textInputs('building_name_2', ''));
    wrapper.find('.onboarding-next-button').simulate('click');
    expect(wrapper.find('SingleInputWithAddIcon').props().errors.building_name_2).toBe('"the building name" is not allowed to be empty');
  });
  it('should send data', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false} >
        <SetupBuildingsStructure />
      </MockedProvider>);
    jest.spyOn(userLocation, 'getUserLocation').mockImplementation(() => ({ id: 233 }));
    uuid.mockImplementationOnce(() => '40138b44-1072-4720-989f-0e8631f83637')
      .mockImplementationOnce(() => '3c85bc4b-7e12-48f8-b6dc-1bf22e86aa63');
    wrapper.find('InputField').find('Input').props().onChange(textInputs('center_name', 'epiccs'));
    wrapper.find('SingleInputWithAddIcon').props().onTextChange(textInputs('building_name_1', 'Muhabura'));
    wrapper.find('SingleInputWithAddIcon').props().onTextChange(textInputs('building_name_2', 'sabyinyo'));
    wrapper.find('.onboarding-next-button').simulate('click');
    expect(wrapper.find('SingleInputWithAddIcon').props().errors).toEqual({ building_name_1: '', building_name_2: '' });
  });

  it('Should add anothe input when increasing number in text inputs', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false} >
        <SetupBuildingsStructure />
      </MockedProvider>);
    wrapper.find('NumberInput').props().onChange(2);
    expect(wrapper.find('InputsWithAddIcons').state().inputs).toBe(2);
  });
});
