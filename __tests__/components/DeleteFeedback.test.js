import React from 'react';
import { shallow } from 'enzyme';
import DeleteFeedback from '../../src/components/DeleteFeedback';

describe('DeleteFeedback Component', () => {
  const props = {
    question: 'How would you rate the cleanliness of this room',
  };

  const event = {
    preventDefault: jest.fn(),
  };

  const wrapper = shallow(<DeleteFeedback {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should handleEditFeedback()', () => {
    wrapper.instance().handleDeleteFeedback(event);
    expect(wrapper.state('closeModal')).toEqual(true);
  });
});
