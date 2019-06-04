import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { SingleRoomFeedBack } from '../../../src/components/roomFeedback/SingleRoom';
import * as QueryHelper from '../../../src/components/helpers/QueriesHelpers';
import { roomCleanlinessRating, totalCleanlinessRating, totalMissingItemsCount, totalRoomResources } from '../../../src/components/roomFeedback/RoomFeedbackResponseList';
import rooms from '../../../src/fixtures/roomFeedbackList';

const props = {
  roomId: 1,
  visible: true,
  showModal: jest.fn(() => true),
  totalMissingItemsCount,
  totalCleanlinessRating,
  roomCleanlinessRating,
  totalRoomResources,
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

const singleRoomResponse = {
  roomResponse: {
    roomName: 'DemoRoom',
    totalResponses: 1,
    response: [
      {
        responseId: 282,
        createdDate: '2019-06-25T10:40:23.818174',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        responseId: 283,
        createdDate: '2019-06-25T10:40:23.818174',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        responseId: 284,
        createdDate: '2019-06-25T10:40:23.818174',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
    ],
  },
};

const emptyResponse = {
  roomResponse: {
    roomName: 'DemoRoom',
    totalResponses: 1,
    response: [],
  },
};

// const emptyProps = {
//   data: {
//     loading: false,
//     roomResponse: {
//       roomName: 'Udi',
//       totalResponses: 0,
//       response: [],
//     },
//   },
//   roomResources: {
//     getResourcesByRoomId: {
//       roomResources: [{
//         room: [{ quantity: 3, resource: { name: 'marker' } }],
//       }, {
//         room: [{ quantity: 3, resource: { name: 'test marker 1' } }],
//       }],
//     },
//   },
//   roomId: 1,
//   visible: true,
//   showModal: jest.fn(() => true),
//   totalMissingItemsCount,
//   totalCleanlinessRating,
//   roomCleanlinessRating,
// };

// const errorProps = {
//   data: {
//     loading: false,
//     roomResponse: {
//       roomName: 'Udi',
//       totalResponses: 3,
//       response: [
//         {
//           createdDate: '2019-02-05T15:27:37.236820',
//           missingItems: [],
//           rating: null,
//           responseId: 5,
//           suggestion: 'I have a complaint',
//         },
//       ],
//     },
//   },
//   roomResources: {
//     getResourcesByRoomId: {
//       roomResources: [{
//         room: [{ quantity: 3, resource: { name: 'marker' } }],
//       }, {
//         room: [{ quantity: 3, resource: { name: 'test marker 1' } }],
//       }],
//     },
//   },
//   roomId: 1,
//   visible: true,
//   showModal: jest.fn(() => true),
//   totalMissingItemsCount,
//   totalCleanlinessRating,
//   roomCleanlinessRating,
// };

describe('SingleRoom test', () => {
  it('renders correctly when "visible" prop is "true"', () => {
    const propsWithTrueVisibleProp = {
      rooms,
      roomId: 1,
      visible: true,
      showModal: jest.fn(() => true),
      totalMissingItemsCount,
      totalCleanlinessRating,
      roomCleanlinessRating,
      totalRoomResources,
    };
    const wrapper = mount(
      <MockedProvider>
        <SingleRoomFeedBack {...propsWithTrueVisibleProp} />
      </MockedProvider>,
    );
    expect(wrapper.find('.side-modal')).toHaveLength(1);
  });

  it('renders correctly when "visible" prop is "false" ', () => {
    const propsWithFalseVisibleProp = {
      rooms,
      roomId: 1,
      visible: false,
      showModal: jest.fn(() => true),
      totalMissingItemsCount,
      totalCleanlinessRating,
      roomCleanlinessRating,
      totalRoomResources,
    };
    const wrapper = mount(
      <MockedProvider>
        <SingleRoomFeedBack {...propsWithFalseVisibleProp} />
      </MockedProvider>,
    );
    expect(wrapper.find('.side-modal')).toHaveLength(0);
  });

  describe('SingleRoomFeedBack test', () => {
    jest.spyOn(QueryHelper, 'getRoomResources').mockImplementationOnce(() => singleRoomResource);
    jest.spyOn(QueryHelper, 'getSingleRoomFeedback').mockImplementationOnce(() => singleRoomResponse);
    // const component = mount(<SingleRoomFeedBack {...props} />);


    const emptyComponent = shallow(<SingleRoomFeedBack {...props} />);
    emptyComponent.instance().getRoomResources = jest.fn(() => singleRoomResource);
    emptyComponent.instance().getSingleRoomFeedback = jest.fn(() => (emptyResponse));

    // it('renders three room responses', () => {
    //   expect(component.find('.response-item')).toHaveLength(3);
    // });

    // it('does not render room responses', () => {
    //   expect(emptyComponent.find('.response-item')).toHaveLength(0);
    // });

    // it('renders correctly when there are no responses', () => {
    //   expect(emptyComponent.find('.item-list-empty')).toHaveLength(1);
    // });

    it('renders correctly when a room has no resources', () => {
      const errorComponent = shallow(<SingleRoomFeedBack {...props} />);
      errorComponent.instance().getSingleRoomFeedback = jest.fn(() => (singleRoomResponse));
      expect(errorComponent.find('.response-item')).toHaveLength(1);
    });
  });
});
