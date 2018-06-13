import React from 'react';
import { shallow } from 'enzyme';
import DeleteOffice from '../../src/components/DeleteOffice';

describe('DeleteOffice Test Suite', () => {
  const wrapper = shallow(<DeleteOffice officeName="EPIC Tower" />);

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().closeModal).toEqual(false);
  });

  it('should have a title prop', () => {
    expect(wrapper.prop('title')).toEqual('DELETE OFFICE');
  });

  it('should have a buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Delete');
  });

  it('closes the modal after delete', () => {
    const deleteButton = wrapper.find('#delete-btn');
    deleteButton.simulate('click', { preventDefault() {} });
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should close the modal on cancelling', () => {
    const cancelButton = wrapper.find('#cancel-btn');
    cancelButton.simulate('click', { preventDefault() { } });
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handle state change', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });
});
