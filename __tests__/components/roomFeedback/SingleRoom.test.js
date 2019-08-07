import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { SingleRoomFeedBack } from '../../../src/components/roomFeedback/SingleRoom';
import { getRoomResources, getSingleRoomFeedback } from '../../../src/components/helpers/QueriesHelpers';
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
    totalResponses: 4,
    response: [
      {
        id: 282,
        createdDate: '2019-06-25T10:40:23.818174',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        id: 283,
        createdDate: '2019-06-25T10:40:23.818174',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        id: 284,
        createdDate: '2019-06-25T10:40:23.818174',
        resolved: false,
        response: {
          __typename: 'Rate',
          rate: 5,
        },
      },
      {
        id: 287,
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
    totalResponses: 0,
    response: [],
  },
};


jest.mock('../../../src/components/helpers/QueriesHelpers');

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

  describe('SingleRoomFeedBack test', async () => {
    await getRoomResources.mockImplementationOnce(() => singleRoomResource.roomResources);
    await getSingleRoomFeedback.mockImplementationOnce(() => emptyResponse.roomResponse);
    const emptyComponent = mount(<SingleRoomFeedBack {...props} />);

    it('renders three room responses', async () => {
      getRoomResources.mockResolvedValue(singleRoomResource.roomResources);
      getSingleRoomFeedback.mockResolvedValue(singleRoomResponse.roomResponse);
      const component = mount(<SingleRoomFeedBack {...props} />);
      await component.setProps({ roomId: 2 });
      await component.update();

      expect(component.find('.response-item')).toHaveLength(3);
    });

    it('does not render room responses', () => {
      expect(emptyComponent.find('.response-item')).toHaveLength(0);
    });

    it('renders correctly when there are no responses', () => {
      expect(emptyComponent.find('.item-list-empty')).toHaveLength(1);
    });

    it('renders correctly when a room has no resources', () => {
      const errorComponent = shallow(<SingleRoomFeedBack {...props} />);
      errorComponent.instance().getSingleRoomFeedback = jest.fn(() => (singleRoomResponse));
      expect(errorComponent.find('.response-item')).toHaveLength(3);
    });
  });
});
