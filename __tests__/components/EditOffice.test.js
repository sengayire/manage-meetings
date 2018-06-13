import React from 'react';
import { shallow } from 'enzyme';
import EditOffice from '../../src/components/EditOffice';

describe('EditOffice Test Suite', () => {
  const wrapper = shallow(<EditOffice />);

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().closeModal).toEqual(false);
  });

  it('should have a title prop', () => {
    expect(wrapper.prop('title')).toEqual('EDIT OFFICE');
  });

  it('should have a buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Edit');
  });

  it('should close the modal on click', () => {
    expect(wrapper.instance().handleCloseModal());
  });

  it('should handle state change', () => {
    expect(wrapper.instance().handleModalStateChange());
  });
});
