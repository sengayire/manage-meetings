import React from 'react';
import { shallow } from 'enzyme';
import { RoomFeedbackResponseList, roomCleanlinessRating } from '../../../src/components/roomFeedback/RoomFeedbackResponseList';
import Spinner from '../../../src/components/commons/Spinner';
import ErrorIcon from '../../../src/components/commons/ErrorIcon';

const responseListProps = {
  data: {
    loading: false,
    error: null,
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
              missingItems: [],
            },
            {
              responseId: 3,
              missingItems: ['Tissue box', 'Ethernet Cable'],
            },
          ],
        },
      ],
    },
  },
};

const propsWithoutMissingItems = {
  data: {
    loading: false,
    error: null,
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
              missingItems: [],
            },
          ],
        },
      ],
    },
  },
};

const propsWithoutResponses = {
  data: {
    loading: false,
    error: null,
    allRoomResponses: {
      responses: [],
    },
  },
};

describe('Room feedback list', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a spinner when loading prop is true', () => {
    const loadingProps = {
      data: {
        loading: true,
        error: null,
      },
    };
    const wrapper = shallow(<RoomFeedbackResponseList {...loadingProps} />);
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('should render an error message when error prop is true', () => {
    const errorProps = {
      data: {
        loading: false,
        error: {},
      },
    };
    const wrapper = shallow(<RoomFeedbackResponseList {...errorProps} />);
    expect(wrapper.find(ErrorIcon)).toHaveLength(1);
  });

  it('should render the correct error message when a role error is returned', () => {
    const errorProps = {
      data: {
        loading: false,
        error: {
          message: 'GraphQL error: You are not authorized to perform this action',
        },
      },
    };
    const wrapper = shallow(<RoomFeedbackResponseList {...errorProps} />);
    const ErrorComponent = wrapper.find(ErrorIcon);
    expect(ErrorComponent).toHaveLength(1);
    expect(ErrorComponent.dive().text()).toContain('You are not authorized to perform this action');
  });

  it('should render correctly when no room has an error response', () => {
    const emptyComponent = shallow(<RoomFeedbackResponseList {...propsWithoutResponses} />);
    expect(emptyComponent.find('.item-list-empty')).toHaveLength(1);
  });

  it('should return the correct number of rooms with missing items', () => {
    const { data: { allRoomResponses: { responses } } } = responseListProps;
    const { data: { allRoomResponses: { responses: noMissingItems } } } = propsWithoutMissingItems;
    const componentWithMissingItems = shallow(<RoomFeedbackResponseList {...responseListProps} />);
    const componentWithoutMissingItems = shallow(
      <RoomFeedbackResponseList {...propsWithoutMissingItems} />,
    );
    const instanceWithMissingItems = componentWithMissingItems.instance();
    const instanceWithoutMissingItems = componentWithoutMissingItems.instance();
    const count1 = instanceWithMissingItems.getRoomsWithMissingItems(responses);
    const count2 = instanceWithoutMissingItems.getRoomsWithMissingItems(noMissingItems);

    expect(count1).toEqual(1);
    expect(count2).toEqual(0);
  });

  it('returns the correct star rating markup', () => {
    const result = roomCleanlinessRating(1);
    expect(result.length).toEqual(5);
  });
});
