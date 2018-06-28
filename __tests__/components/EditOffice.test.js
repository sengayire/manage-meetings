import React from 'react';
import { shallow } from 'enzyme';
import { EditOffice } from '../../src/components/EditOffice';

describe('EditOffice Component', () => {
  const props = {
    officeName: 'Epic',
    location: 'Lagos',
  };
  const wrapper = shallow(<EditOffice {...props} />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should have one label', () => {
    const modalForm = wrapper.find('label');
    expect(modalForm).toHaveLength(1);
  });

  it('should have two buttons', () => {
    const modalForm = wrapper.find('button');
    expect(modalForm).toHaveLength(2);
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('handles handleEditOffice()', () => {
    wrapper.instance().handleEditOffice({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#officeName').simulate('change', { target: { name: 'officeName', value: 'Epic' } });
    expect(wrapper.find('#officeName').props().value).toBe('Epic');
    expect(wrapper.state('officeName')).toEqual('Epic');
  });

  it('handles handleLocationChange()', () => {
    wrapper.instance().handleLocationChange('Nairobi');
    expect(wrapper.state('location')).toEqual('Nairobi');
  });
});
