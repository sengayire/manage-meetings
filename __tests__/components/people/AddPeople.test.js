import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import { ApolloError } from 'apollo-client';
import wait from 'waait';
import * as notification from '../../../src/utils/notification';
import AddPeople from '../../../src/components/people/AddPeople';
import { invitePersonMutation } from '../../../src/components/helpers/mutationHelpers/people';

jest.mock('../../../src/components/helpers/mutationHelpers/people');

describe('AddPeople Component', () => {
  const initProps = {
    availableUsers: {},
  };

  const errorMessage = 'User already joined Converge';
  const error = new ApolloError({ graphQLErrors: [new Error(errorMessage)] });
  const notificationSpy = jest.spyOn(notification, 'default');
  const wrapper = shallow(<AddPeople {...initProps} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change closeModal to true when handleCloseModal is called', () => {
    wrapper.setState({ closeModal: false });
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should call  handleCloseModal()', () => {
    const modalSpy = jest.spyOn(wrapper.instance(), 'handleCloseModal').mockImplementation(() => {});
    wrapper.instance().handleCloseModal();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toBe(false);
  });

  it('should call notification with a success message', async () => {
    const instance = wrapper.instance();
    invitePersonMutation.mockResolvedValue({});
    instance.submitInvite();
    await wait();
    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'success', 'User Successfully invited');
  });

  it('should call notification with an error message', async () => {
    const instance = wrapper.instance();
    invitePersonMutation.mockRejectedValue(error);
    instance.submitInvite();
    await wait();
    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'error', errorMessage);
  });

  it('should change the value of people in the state', () => {
    expect(wrapper.instance().state.people).toEqual('');
    const event = { target: { name: 'email', value: 'johndoe@andela.com' } };
    wrapper.instance().handleInputChange(event);
    expect(wrapper.instance().state.people).toEqual('johndoe@andela.com');
  });
});
