import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponse from '../../../src/components/roomFeedback/RoomFeedbackResponse';
import { RoomFeedbackResponseList, roomCleanlinessRating, totalCleanlinessRating, totalMissingItemsCount } from '../../../src/components/roomFeedback/RoomFeedbackResponseList';

const rating = { totalRating: 3, grade: 2 };

const props = {
  activeRoomId: null,
  totalMissingItemsCount,
  roomCleanlinessRating,
  totalCleanlinessRating,
  viewSingleFeed: jest.fn(),
  roomFeedbackResponse: {
    roomId: 1,
    roomName: 'Olkaria',
    totalResponses: 25,
    totalRoomResources: 5,
    response: [
      {
        responseId: 1,
        suggestion: 'This is a suggestion',
        missingItems: [],
      },
      {
        responseId: 2,
        rating: 2,
        missingItems: [],
      },
      {
        responseId: 3,
        missingItems: ['Tissue box', 'Ethernet Cable'],
      },
    ],
  },
};

const responseListProps = {
  data: {
    loading: false,
    error: null,
    fetchMore: jest.fn(() => Promise.resolve()),
    allRoomResponses: {
      responses: [
        {
          roomId: 1,
          roomName: 'Olkaria',
          totalResponses: 25,
          totalRoomResources: 5,
          response: [
            {
              responseId: 1,
              suggestion: 'This is a suggestion',
              missingItems: [],
            },
            {
              responseId: 2,
              rating: 2,
              suggestion: null,
              missingItems: [],
            },
            {
              responseId: 3,
              suggestion: null,
              missingItems: ['Tissue box', 'Ethernet Cable'],
            },
          ],
        },
      ],
    },
  },
};

describe('Room Feedback', () => {
  it('should find Olkaria', () => {
    const wrapper = shallow(<RoomFeedbackResponse {...props} />);
    const text = wrapper
      .find('span')
      .first()
      .text();
    expect(text).toEqual('Olkaria');
  });

  it('componentWillReceiveProps', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    const allRoomResponses = {
      responses: [
        {
          roomId: 1,
          roomName: 'Olkaria',
          totalResponses: 25,
          totalRoomResources: 5,
          response: [
            {
              responseId: 1,
              suggestion: 'This is a suggestion',
              missingItems: [],
            },
          ],
        },
      ],
    };

    ResponseListComponent.setProps({ allRoomResponses });
    ResponseListComponent.update();
    expect(ResponseListComponent.state().allRoomResponses.responses).toHaveLength(1);
  });

  it('should handle pagination', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    ResponseListComponent.instance().handleData();
    expect(ResponseListComponent.state('isFetching')).toBe(true);
  });

  it('should be able to toggle modal state', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    const ResponseComponent = shallow(<RoomFeedbackResponse {...props} />);
    const ResponseListInstance = ResponseListComponent.instance();
    const ResponseInstance = ResponseComponent.instance();
    const fakeEvent = { preventDefault: () => {} };
    ResponseListInstance.showModal(fakeEvent);
    ResponseInstance.showModal(fakeEvent);
    expect(ResponseListComponent.state().roomId).toEqual(null);
    expect(ResponseListComponent.state().visible).toEqual(true);
  });

  it('should change modal visibility to true', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    const ResponseListInstance = ResponseListComponent.instance();
    const fakeEvent = { preventDefault: () => {} };
    ResponseListInstance.showModal(fakeEvent, 1);
    expect(ResponseListComponent.state().roomId).toEqual(1);
    expect(ResponseListComponent.state().visible).toEqual(true);
  });

  it('should change modal visibility to false', () => {
    const ResponseListComponent = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    const ResponseListInstance = ResponseListComponent.instance();
    const fakeEvent = { preventDefault: () => {} };
    ResponseListInstance.setState({ roomId: 1 });
    ResponseListInstance.showModal(fakeEvent, 1);
    expect(ResponseListComponent.state().roomId).toEqual(null);
    expect(ResponseListComponent.state().visible).toEqual(false);
  });

  it('should not have an active class on initial page load', () => {
    const unClickedRoomFeedbackResponse = shallow(<RoomFeedbackResponse {...props} />);
    expect(unClickedRoomFeedbackResponse.find('.active')).toHaveLength(0);
  });

  it('should have an active class when activeRoomId state is set', () => {
    const activeProps = {
      activeRoomId: 1,
      totalMissingItemsCount: jest.fn(() => 2),
      roomCleanlinessRating: jest.fn(() => <div>Stars</div>),
      totalCleanlinessRating: jest.fn(() => rating),
      viewSingleFeed: jest.fn(),
      roomFeedbackResponse: {
        roomId: 1,
        roomName: 'Olkaria',
        totalResponses: 25,
        totalRoomResources: 5,
        response: [{
          suggestion: null,
        }],
      },
    };

    const activeRoomFeedbackResponse = shallow(<RoomFeedbackResponse {...activeProps} />);
    expect(activeRoomFeedbackResponse.find('.active')).toHaveLength(1);
  });
});
