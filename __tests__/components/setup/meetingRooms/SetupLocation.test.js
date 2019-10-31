/* eslint-disable import/first */
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import SetupLocation from '../../../../src/components/setup/meetingRooms/SetupLocation';

jest.mock('../../../../src/components/helpers/QueriesHelpers');
import { getAllLocations, getUserDetails } from '../../../../src/components/helpers/QueriesHelpers';

getUserDetails.mockImplementation(() => ({ id: '10', location: 'Kigali' }));
getAllLocations.mockImplementation(() => (
  [
    { id: '2', name: 'Kampala' },
    { id: '10', name: 'Kigali' },
    { id: '1', name: 'Lagos' },
    { id: '3', name: 'Nairobi' },
  ]
));
describe('', () => {
  const wrapper = mount(
    <MockedProvider >
      <SetupLocation />
    </MockedProvider>);
  it('test handleClick Button', () => {
    wrapper
      .find('#NextButton')
      .at(1)
      .simulate('click');
  });
  it('test handle Change', () => {
    wrapper.find('InputField')
      .props()
      .handleChange({ target: { value: 'kigali center' } });
  });
  it('test handle Change', () => {
    const target = { value: 'Kigali Center' };
    wrapper
      .find('SetupLocationStructure')
      .props()
      .buildings({}, target);
  });
  it('test function', async () => {
    const buildings = ['muhabura', 'kigali'];
    wrapper.setState(buildings);
    wrapper.find('SetupLocationStructure')
      .props()
      .handleClick();
  });
});
