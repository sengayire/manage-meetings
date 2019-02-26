import React from 'react';
import { shallow } from 'enzyme';
import RoomFeedbackResponseCard from '../../../src/components/roomFeedback/RoomFeedbackResponseCard';

const initProps = {
  title: '',
  value: 0,
};

describe('Room feedback Card Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RoomFeedbackResponseCard {...initProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
