import React from 'react';
import { shallow } from 'enzyme';
import AddOffice from '../../src/components/AddOffice';

describe('AddOffice Component', () => {
  const wrapper = shallow(<AddOffice />);
  const preventDefault = jest.fn();


  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().officeName).toEqual('');
    expect(wrapper.state().officeLocation).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD OFFICE');
  });

  it('includes buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Add Office');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#officeName').simulate('change', { target: { name: 'officeName', value: 'epic' } });
    expect(wrapper.find('#officeName').props().value).toBe('epic');
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('handles handleAddOffice()', () => {
    wrapper.instance().handleAddOffice({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
  });
});
