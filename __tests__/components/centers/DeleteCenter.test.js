import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';
import wait from 'waait';
import { DeleteCenter } from '../../../src/components/centers/DeleteCenter';
import * as notification from '../../../src/utils/notification';

describe('Edit center component', () => {
  const refetch = jest.fn();
  const deleteCenter = jest.fn();
  const props = {
    centerId: '1',
    centerName: 'Lagos',
    refetch,
    deleteCenter,
    isDeleting: false,
  };
  const wrapper = shallow(<DeleteCenter {...props} />);
  const deletedCenter = { centerName: 'Lagos', CenterId: 1 };
  const result = { data: { deletedCenter } };
  it('renders without failing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set closeModal state to false', () => {
    wrapper.setState({ closeModal: true });
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should close modal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should delete center succesfully', () => {
    const newProps = {
      deleteCenter: jest.fn(() => Promise.resolve(result)),
    };
    const newWrapper = shallow(<DeleteCenter centerName="Lagos" centerId="1" {...newProps} />);

    newWrapper.setState({ closeModal: false });
    newWrapper.instance().handleDeleteCenter();
    expect(newProps.deleteCenter).toHaveBeenCalled();
  });

  it('should show error notification when delete center is unsuccesful', async () => {
    jest.clearAllMocks();

    const notificationSpy = jest.spyOn(notification, 'default');
    const error = {
      graphQLErrors: [{
        message: 'Center cannot be deleted',
      }],
    };
    wrapper.setProps({
      deleteCenter: jest.fn(() => Promise.reject(error)),
    });
    wrapper.instance().handleDeleteCenter();
    await wait();

    expect(notificationSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith(toastr, 'error', 'Center cannot be deleted');
  });
});
