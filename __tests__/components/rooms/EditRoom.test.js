import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloError } from 'apollo-client';
import { MockedProvider } from 'react-apollo/test-utils';
import WrappedEditRoom, { EditRoom } from '../../../src/components/rooms/EditRoom';
import allRoomsReturnData, { locationData } from '../../../__mocks__/rooms/Rooms';
import { GET_LOCATIONS_QUERY, GET_ROOMS_QUERY } from '../../../src/graphql/queries/Rooms';
import EDIT_ROOM_DETAILS_MUTATION from '../../../src/graphql/mutations/Rooms';

describe('EditRoom', () => {
  const mutationResult = {
    data: {
      updateRoom: {
        room: {
          name: 'HighLan',
        },
      },
    },
  };

  const getRoomsResult = {
    data: {
      allRooms: {
        rooms: allRoomsReturnData.data.allRooms.rooms,
      },
    },
  };

  const getLocationsQuery = [{
    allLocations: locationData.data.allLocations,
    name: 'Douglas',
    data: {
      allLocations: locationData.data.allLocations,
      name: 'Douglas',
    },
  }];


  const mocks = [
    {
      request: {
        query: GET_ROOMS_QUERY,
      },
      result: getRoomsResult,
    },
    {
      request: {
        query: GET_LOCATIONS_QUERY,
      },
      result: getLocationsQuery,
    },
    {
      request: {
        query: EDIT_ROOM_DETAILS_MUTATION,
        variables: {
          roomId: '1',
          name: 'HighLan',
        },
      },
      result: mutationResult,
    },
  ];

  const props = {
    editRoom: jest.fn(Promise.resolve(mutationResult)),
    getRoomsQuery: jest.fn(Promise.resolve(getRoomsResult)),
    locations: getLocationsQuery,
  };


  describe('Wrapped component', () => {
    const setup =
      (
        <MockedProvider
          mocks={mocks}
          addTypename={false}
        >
          <WrappedEditRoom
            {...props}
            roomLocation={1}
            roomName="HighLan"
            roomId="1"
          />
        </MockedProvider>);
    const wrapperForFunctionality = mount(setup);


    const event = {
      preventDefault: jest.fn(),
      target: {
        name: '',
        value: '',
      },
    };

    const wrapperValue = wrapperForFunctionality.find('EditRoom');

    it('should return an error notification if an error was encountered', () => {
      const errorProps = {
        roomLocation: 1,
        roomName: 'HighLan',
        roomId: '1',
        locations: locationData.data,
        editRoom: jest.fn(() => Promise.reject(new ApolloError({ graphQLErrors: [new Error('Please supply a valid room name')] }))),
      };
      const newWrapper = shallow(<EditRoom {...errorProps} />);
      newWrapper.instance().handleEditRoom();
      expect(errorProps.editRoom).toHaveBeenCalled();
    });

    it('should return a notification when a room is edited succesfully', () => {
      const newProps = {
        roomLocation: 1,
        roomName: 'HighLan',
        roomId: '1',
        locations: locationData.data,
        editRoom: jest.fn(() => Promise.resolve(mutationResult)),
        currentPage: 1,
        refetch: jest.fn(),
      };
      const newWrapper = shallow(<EditRoom {...newProps} />);
      const newState = {
        roomName: 'HighLan',
        roomId: '1',
      };
      newWrapper.setState({ ...newState });
      newWrapper.instance().handleEditRoom();
      expect(newProps.editRoom).toBeCalled();
    });

    it('should call handleFormInputChange', () => {
      const action = wrapperValue.instance();
      const handleInputChange = jest.spyOn(wrapperValue.instance(), 'handleInputChange');
      action.handleInputChange(event);
      expect(handleInputChange).toBeCalled();
    });

    it('should call handleCloseModal', () => {
      const action = wrapperValue.instance();
      const handleCloseModal = jest.spyOn(wrapperValue.instance(), 'handleCloseModal');
      action.handleCloseModal();
      expect(handleCloseModal).toBeCalled();
    });

    it('should call handleModalStateChange', () => {
      const action = wrapperValue.instance();
      const handleModalStateChange = jest.spyOn(wrapperValue.instance(), 'handleModalStateChange');
      action.handleModalStateChange();
      expect(handleModalStateChange).toBeCalled();
    });
  });
});
