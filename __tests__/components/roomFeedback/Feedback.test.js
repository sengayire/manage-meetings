import React from 'react';
import { shallow } from 'enzyme';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import defaultUserRole from '../../../src/fixtures/user';

describe('RoomFeeback Component', () => {
  const testProps = {
    questions: [{
      id: '1',
      questionId: '3',
      question: 'test question',
      questionTitle: 'my title',
      startDate: '2019-05-21 13:32:15.753',
      endDate: '2019-05-22 13:32:15.753',
      questionResponseCount: 2,
      questionType: 'test',
      isActive: true,
    }],
    loading: false,
    refetch: jest.fn(),
  };

  const wrapper = shallow(
    <RoomFeedback user={defaultUserRole.user} {...testProps} />,
  );
  it('should render table headers property while rendering the component', () => {
    expect(wrapper.find('TableHead')).toHaveLength(1);
  });

  it('should render errorIcon when no questions', () => {
    wrapper.setProps({ questions: [] });
    expect(wrapper.find('TableHead')).toHaveLength(0);
    expect(wrapper.find('ErrorIcon')).toHaveLength(1);
  });
});
