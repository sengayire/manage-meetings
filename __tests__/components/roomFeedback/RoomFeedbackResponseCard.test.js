import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponseCard from '../../../src/components/roomFeedback/RoomFeedbackResponseCard';


describe('Room feedback card', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RoomFeedbackResponseCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
