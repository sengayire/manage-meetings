import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackFilterButton from '../../../src/components/roomFeedback/RoomFeedbackFilterButton';


describe('Room feedback filter button', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RoomFeedbackFilterButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
