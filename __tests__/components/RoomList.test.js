import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_ROOMS_QUERY } from '../../src/graphql/queries/Rooms';
import allRooms from '../../__mocks__/rooms/Rooms';
import Rooms from '../../src/components/RoomsList';

describe('RoomList Component', () => {
  const request = { query: GET_ROOMS_QUERY };
  const result = { ...allRooms };
  const error = 'Something Went Wrong';

  const wrapperCode = (
    <MockedProvider mocks={[{ request, result }]} addTypename>
      <Rooms />
    </MockedProvider>);

  it('renders correctly from memory', () => {
    expect(mount(wrapperCode)).toMatchSnapshot();
  });

  it('should render loading screen', () => {
    const wrapper = mount(wrapperCode);
    expect(wrapper.find('RoomsList').props().data.loading).toBe(true);
  });

  it('should render an error screen', async () => {
    const errorWrapper = (
      <MockedProvider mocks={[{ request, error }]} addTypename>
        <Rooms />
      </MockedProvider>);
    const wrapper = mount(errorWrapper);
    // check whether there is no error during when a loading
    expect(wrapper.find('RoomsList').props().data.error).toBe(undefined);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    // check whether an error occurs after loading
    expect(wrapper.find('RoomsList').props().data.error).toBeTruthy();
    expect(wrapper.find('RoomsList').props().data.error.networkError).toBe(error);
  });

  it('should should pass the allRooms props to the contained element', async () => {
    const wrapper = mount(wrapperCode);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find('RoomsList')).toHaveLength(1);
    expect(wrapper.find('RoomsList').prop('data').allRooms.length).toEqual(allRooms.data.allRooms.length);
  });
});