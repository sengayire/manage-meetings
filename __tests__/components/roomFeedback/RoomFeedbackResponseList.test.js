import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponseList from '../../../src/components/roomFeedback/RoomFeedbackResponseList';


describe('Room feedback list', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RoomFeedbackResponseList />);
    expect(wrapper).toMatchSnapshot();
  });
});
