import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import { ApolloError } from 'apollo-client';
import wait from 'waait';
import { DeleteFeedback } from '../../../src/components/roomFeedback/DeleteFeedback';
import * as notification from '../../../src/utils/notification';
import { deleteQuestionMutation } from '../../../src/components/helpers/mutationHelpers/questions';

jest.mock('../../../src/components/helpers/mutationHelpers/questions');


describe('DeleteFeedback Component', () => {
  const initProps = {
    id: '1',
    question: 'Test question',
    deleteFeedback: jest.fn(),
    refetch: jest.fn(),
  };
  const errorMessage = 'The room was not deleted successfully';
  const error = new ApolloError({ graphQLErrors: [new Error(errorMessage)] });
  const notificationSpy = jest.spyOn(notification, 'default');


  const wrapper = shallow(<DeleteFeedback {...initProps} />);
  const modalSpy = jest.spyOn(wrapper.instance(), 'handleCloseModal').mockImplementation(() => {});
  it('should handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should call notification with a success message', async () => {
    const instance = wrapper.instance();
    deleteQuestionMutation.mockResolvedValue({});
    instance.handleDeleteFeedback();
    await wait();
    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'success', 'Question deleted successfully');
  });

  it('should call notification with an error message', async () => {
    const instance = wrapper.instance();
    deleteQuestionMutation.mockRejectedValue(error);
    instance.handleDeleteFeedback();
    await wait();
    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'error', errorMessage);
  });
});
