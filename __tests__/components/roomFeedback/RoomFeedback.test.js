import React from 'react';
import { mount, shallow } from 'enzyme';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import defaultUserRole from '../../../src/fixtures/user';

describe('Tests for RoomFeedback Component', () => {
  const startDate = new Date('2019-02-21 23:42:43');
  const testData = {
    data: {
      allQuestions: [
        {
          question: 'How do you enjoy our services?',
          questionType: 'input',
          startDate: '2019-02-20 23:42:43',
          endDate: '2019-03-28 15:42:43',
          questionResponseCount: 1,
          isActive: false,
        },
      ],
    },
    user: defaultUserRole,
  };
  const testProps = {
    data: {
      questions: {
        questions: [{}],
      },
      loading: true,
      error: undefined,
    },
    user: defaultUserRole,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
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

  it('should receive props', () => {
    expect(wrapper.instance().componentWillReceiveProps(testProps));
  });

  it('should have empty user props', () => {
    const props = {
      user: {},
      data: testData,
    };
    const roomFeedback = shallow(<RoomFeedback user={{}} />);
    expect(roomFeedback.instance().componentWillReceiveProps(props)).toBeFalsy();
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
    };
    const roomFeedback = shallow(<RoomFeedback {...errorProps} />);
    expect(roomFeedback.find('ErrorIcon')).toHaveLength(1);
  });
});
