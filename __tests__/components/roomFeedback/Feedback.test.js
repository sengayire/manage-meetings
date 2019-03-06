import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import defaultUserRole from '../../../src/fixtures/user';
import Error from '../../../src/components/commons/Errors';

describe('RoomFeeback Component', () => {
  const testProps = {
    data: {
      questions: {
        questions: [{
          id: '1',
          question: 'test question',
          startDate: '2019-05-21 13:32:15.753',
          endDate: '2019-05-22 13:32:15.753',
          questionResponseCount: 2,
          questionType: 'test',
          isActive: true,
        }],
      },
      loading: false,
      error: undefined,
    },
    user: defaultUserRole,
  };
  const wrapper = mount(
    <MockedProvider>
      <Router>
        <RoomFeedback user={defaultUserRole} {...testProps} />
      </Router>
    </MockedProvider>,
  );
  it('should render table row property while rendering the component', () => {
    expect(wrapper.find('.table__row')).toHaveLength(1);
  });

  it('should have empty user prop', () => {
    const roomFeedback = shallow(<RoomFeedback user={{}} {...testProps} />);
    expect(roomFeedback.props().user).toBeFalsy();
  });

  it('should have an error component with length 1', () => {
    const newProps = {
      loading: false,
      error: undefined,
      data: { questions: { questions: [] } },
      user: {},
    };
    const roomFeedback = shallow(<RoomFeedback {...newProps} />);
    expect(roomFeedback.find(Error)).toHaveLength(1);
  });
});
