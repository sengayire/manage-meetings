import React from 'react';
import { shallow } from 'enzyme';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import defaultUserRole from '../../../src/fixtures/user';

describe('Tests for RoomFeedback Component', () => {
  const startDate = new Date('2019-02-21 23:42:43');
  const testProps = {
    data: {
      questions: {
        questions: [{}],
      },
      loading: true,
      error: undefined,
    },
    user: defaultUserRole,
    client: { query: jest.fn() },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RoomFeedback {...testProps} />);
  });

  it('should call durationInWeeks method with the same start and end date', () => {
    const endDate = startDate;
    expect(wrapper.instance().durationInWeeks(startDate, endDate)).toBeTruthy();
  });

  it('should call durationInWeeks method when duration is exactly 1 Day', () => {
    const endDate = new Date('2019-02-22 23:42:43');
    expect(wrapper.instance().durationInWeeks(startDate, endDate)).toBeTruthy();
  });

  it('should call durationInWeeks method when duration is exactly 1 week', () => {
    const endDate = new Date('2019-02-29 23:42:43');
    expect(wrapper.instance().durationInWeeks(startDate, endDate)).toBeTruthy();
  });

  it('should call durationInWeeks method when duration is less than 1 week', () => {
    const endDate = new Date('2019-02-23 23:42:43');
    expect(wrapper.instance().durationInWeeks(startDate, endDate)).toBeTruthy();
  });

  it('should call durationInWeeks method when duration is more than 1 week', () => {
    const endDate = new Date('2019-03-23 23:42:43');
    expect(wrapper.instance().durationInWeeks(startDate, endDate)).toBeTruthy();
  });

  it('should call formatStartDate method', () => {
    wrapper.instance().formatStartDate('2019-03-23 23:42:43');
  });

  it('should show the ErrorIcon component when an error occurs', () => {
    const errorProps = {
      data: {
        questions: {
          questions: [{}],
        },
        loading: false,
        error: {},
      },
      user: defaultUserRole,
      client: {},
    };
    const roomFeedback = shallow(<RoomFeedback {...errorProps} />);
    expect(roomFeedback.find('ErrorIcon')).toHaveLength(1);
  });
});
