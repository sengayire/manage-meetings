import React from 'react';
import { shallow } from 'enzyme';
import { RoomFeedbackResponseList, roomCleanlinessRating } from '../../../src/components/roomFeedback/RoomFeedbackResponseList';

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
              __typename: 'MissingItems',
              missingItems: { id: 'test', name: 'test name' },
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


const propsWithoutResponses = {
  loading: false,
  feedback: {
    roomsResponses: [],
  },
};

describe('Room feedback list', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <RoomFeedbackResponseList {...responseListProps} checkData={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a spinner when loading prop is true', () => {
    const loadingProps = {
      ...propsWithoutResponses,
      loading: true,
    };
    const wrapper = shallow(
      <RoomFeedbackResponseList {...loadingProps} checkData={jest.fn()} />);
    expect(wrapper.find('Overlay')).toHaveLength(1);
  });

  it('should render correctly when no room has an error response', () => {
    const emptyComponent = shallow(
      <RoomFeedbackResponseList {...propsWithoutResponses} checkData={jest.fn()} />);
    expect(emptyComponent.find('.item-list-empty')).toHaveLength(1);
  });

  it('returns the correct star rating markup', () => {
    const result = roomCleanlinessRating(1);
    expect(result.length).toEqual(5);
  });
});
