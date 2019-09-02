import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponse from '../../../src/components/roomFeedback/RoomFeedbackResponse';
import { RoomFeedbackResponseList, roomCleanlinessRating, totalCleanlinessRating, totalMissingItemsCount, totalRoomResources } from '../../../src/components/roomFeedback/RoomFeedbackResponseList';

// const rating = { totalRating: 3, grade: 2 };

const props = {
  activeRoomId: null,
  totalMissingItemsCount,
  roomCleanlinessRating,
  totalCleanlinessRating,
  totalRoomResources,
  viewSingleFeed: jest.fn(),
  roomFeedbackResponse: {
    roomId: 1180,
    roomName: 'pandora',
    totalResponses: 3,
    response: [
      {
        id: 289,
        createdDate: '2019-06-25T14:45:26.577611',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        id: 290,
        createdDate: '2019-06-25T14:45:27.942964',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        id: 291,
        createdDate: '2019-06-25T14:46:06.718295',
        resolved: false,
        response: {
          __typename: 'SelectedOptions',
          options: [
            'handywork',
          ],
        },
      },
    ],
  },
};

const singleRoomResource = {
  roomResources: [
    {
      room: [
        {
          quantity: 1,
          resource: {
            name: 'White wipe',
            room: [
              {
                name: 'White wipe',
              },
            ],
          },
        },
      ],
    },
  ],
};

const responseListProps = {
  loading: false,
  feedback: {
    roomsResponses: [
      {
        roomId: 1,
        roomName: 'Olkaria',
        totalResponses: 25,
        totalRoomResources: 5,
        response: [
          {
            id: 289,
            createdDate: '2019-06-25T14:45:26.577611',
            resolved: false,
            response: {
              __typename: 'Rate',
              rate: 5,
            },
          },
          {
            id: 290,
            createdDate: '2019-06-25T14:45:27.942964',
            resolved: false,
            response: {
              __typename: 'Rate',
              rate: 5,
            },
          },
          {
            id: 291,
            createdDate: '2019-06-25T14:46:06.718295',
            resolved: false,
            response: {
              __typename: 'SelectedOptions',
              options: [
                'handywork',
              ],
            },
          },
        ],
      },
    ],
  },
};


describe('Room Feedback', () => {
  it('should find pandora', () => {
    const wrapper = shallow(
      <RoomFeedbackResponse {...props} checkData={jest.fn()} />);
    wrapper.instance().getRoomResources = jest.fn(() => singleRoomResource);
    const text = wrapper
      .find('span')
      .first()
      .text();
    expect(text).toEqual('pandora');
  });

  it('should handle pagination', () => {
    const ResponseListComponent = shallow(
      <RoomFeedbackResponseList {...responseListProps} checkData={jest.fn()} />);
    ResponseListComponent.instance().handleData(5, 1);
    expect(ResponseListComponent.state('perPage')).toBe(5);
    expect(ResponseListComponent.state('currentPage')).toBe(1);
  });

  it('should change modal visibility to true', () => {
    const ResponseListComponent = shallow(
      <RoomFeedbackResponseList {...responseListProps} checkData={jest.fn()} />);
    const ResponseListInstance = ResponseListComponent.instance();
    const fakeEvent = { preventDefault: () => { } };
    const data = { roomId: 1, responseIds: [] };
    ResponseListInstance.showModal(fakeEvent, data);
    expect(ResponseListComponent.state().roomId).toEqual(1);
    expect(ResponseListComponent.state().visible).toEqual(true);
  });

  it('should change modal visibility to false', () => {
    const ResponseListComponent = shallow(
      <RoomFeedbackResponseList {...responseListProps} checkData={jest.fn()} />);
    const ResponseListInstance = ResponseListComponent.instance();
    const fakeEvent = { preventDefault: () => { } };
    ResponseListInstance.showModal(fakeEvent);
    expect(ResponseListComponent.state().roomId).toEqual(null);
    expect(ResponseListComponent.state().visible).toEqual(false);
  });

  it('should not have an active class on initial page load', () => {
    const unClickedRoomFeedbackResponse = shallow(
      <RoomFeedbackResponse {...props} checkData={jest.fn()} />);
    expect(unClickedRoomFeedbackResponse.find('.active')).toHaveLength(0);
  });

  it('should have an active class when activeRoomId state is set', () => {
    const activeProps = {
      activeRoomId: 1180,
      totalMissingItemsCount,
      roomCleanlinessRating,
      totalCleanlinessRating,
      totalRoomResources,
      viewSingleFeed: jest.fn(),
      roomFeedbackResponse: {
        roomId: 1180,
        roomName: 'pandora',
        totalResponses: 3,
        response: [
          {
            id: 289,
            createdDate: '2019-06-25T14:45:26.577611',
            resolved: false,
            response: {
              __typename: 'Rate',
              rate: 5,
            },
          },
          {
            id: 290,
            createdDate: '2019-06-25T14:45:27.942964',
            resolved: false,
            response: {
              __typename: 'Rate',
              rate: 5,
            },
          },
          {
            id: 291,
            createdDate: '2019-06-25T14:46:06.718295',
            resolved: false,
            response: {
              __typename: 'SelectedOptions',
              options: [
                'handywork',
              ],
            },
          },
        ],
      },
    };

    const activeRoomFeedbackResponse = shallow(
      <RoomFeedbackResponse {...activeProps} checkData={jest.fn()} />);
    activeRoomFeedbackResponse.instance().getRoomResources = jest.fn(() => singleRoomResource);
    expect(activeRoomFeedbackResponse.hasClass('active')).toBeTruthy();
  });
});
