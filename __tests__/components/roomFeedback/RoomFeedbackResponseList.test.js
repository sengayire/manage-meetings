import React from 'react';
import { shallow } from 'enzyme';
import { RoomFeedbackResponseList, roomCleanlinessRating } from '../../../src/components/roomFeedback/RoomFeedbackResponseList';
import ErrorIcon from '../../../src/components/commons/ErrorIcon';

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
              responseId: 289,
              createdDate: '2019-06-25T14:45:26.577611',
              resolved: false,
              response: {
                __typename: 'Rate',
                rate: 5,
              },
            },
            {
              responseId: 290,
              createdDate: '2019-06-25T14:45:27.942964',
              resolved: false,
              response: {
                __typename: 'MissingItems',
                missingItems: { id: 'test', name: 'test name' },
              },
            },
            {
              responseId: 291,
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
    const wrapper = shallow(
      <RoomFeedbackResponseList {...responseListProps} checkData={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a spinner when loading prop is true', () => {
    const loadingProps = {
      data: {
        loading: true,
        error: null,
      },
    };
    const wrapper = shallow(
      <RoomFeedbackResponseList {...loadingProps} checkData={jest.fn()} />);
    expect(wrapper.find('Overlay')).toHaveLength(1);
  });

  it('should render an error message when error prop is true', () => {
    const errorProps = {
      data: {
        loading: false,
        error: {},
      },
    };
    const wrapper = shallow(
      <RoomFeedbackResponseList {...errorProps} checkData={jest.fn()} />);
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
    const wrapper = shallow(
      <RoomFeedbackResponseList {...errorProps} checkData={jest.fn()} />);
    const ErrorComponent = wrapper.find(ErrorIcon);
    expect(ErrorComponent).toHaveLength(1);
    expect(ErrorComponent.dive().text()).toContain('You are not authorized to perform this action');
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
