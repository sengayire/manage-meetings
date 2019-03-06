import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import { ApolloError } from 'apollo-client';
import wait from 'waait';
import { DeleteFeedback } from '../../../src/components/roomFeedback/DeleteFeedback';
import * as notification from '../../../src/utils/notification';

describe('DeleteFeedback Component', () => {
  const initProps = {
    id: '1',
    question: 'Test question',
    deleteFeedback: jest.fn(),
  };
  const errorMessage = 'The room was not deleted successfully';
  const error = new ApolloError({ graphQLErrors: [new Error(errorMessage)] });
  const notificationSpy = jest.spyOn(notification, 'default');

  const wrapper = shallow(<DeleteFeedback {...initProps} />);
  it('should handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should call notification with a success message', async () => {
    wrapper.setProps({
      deleteFeedback: jest.fn(() => Promise.resolve()),
    });
    wrapper.instance().handleDeleteFeedback();
    await wait();
    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'success', `${initProps.question} has been deleted successfully`);
  });

  it('should call notification with an error message', async () => {
    jest.clearAllMocks();
    wrapper.setProps({
      deleteFeedback: jest.fn(() => Promise.reject(error)),
    });
    wrapper.instance().handleDeleteFeedback();
    await wait();
    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'error', errorMessage);
  });
});
