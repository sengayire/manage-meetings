import React from 'react';
import { mount } from 'enzyme';
import SingleRoom from '../../src/components/roomFeedback/SingleRoom';
import rooms from '../../src/fixtures/roomFeedbackList';

const props = {
  rooms,
  roomId: 1,
  visible: true,
  showModal: jest.fn(() => true),
};

describe('SingleRoom test', () => {
  it('renders correctly when "visible" prop is "true"', () => {
    const wrapper = mount(<SingleRoom {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when "visible" prop is "false" ', () => {
    const propsWithFalseVisibleProp = {
      rooms,
      roomId: 1,
      visible: false,
      showModal: jest.fn(() => true),
    };
    const wrapper = mount(<SingleRoom {...propsWithFalseVisibleProp} />);
    expect(wrapper).toMatchSnapshot();
  });
});
