import React from 'react';
import { shallow } from 'enzyme';
import { DeleteFeedback } from '../../../src/components/roomFeedback/DeleteFeedback';
import notification from '../../../src/utils/notification';

jest.mock('../../../src/utils/notification');

describe('DeleteFeedback Component', () => {
  const initProps = {
    id: '1',
    question: 'Test question',
    deleteFeedback: jest.fn(),
  };
  const wrapper = shallow(<DeleteFeedback {...initProps} />);

  it('should handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should call notification with a success message', () => {
    wrapper.setProps({
      deleteFeedback: jest.fn(() => Promise.resolve(notification('success'))),
    });
    wrapper.instance().handleDeleteFeedback();
    expect(notification.mock.calls[0][0]).toBe('success');
  });

  it('should call notification with an error message', () => {
    jest.clearAllMocks();
    wrapper.setProps({
      deleteFeedback: jest.fn(() => Promise.reject(notification('error'))),
    });
    wrapper.instance().handleDeleteFeedback();
    expect(notification.mock.calls[0][0]).toBe('error');
  });
});
