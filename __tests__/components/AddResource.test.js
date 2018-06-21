import React from 'react';
import { mount } from 'enzyme';
import AddResource from '../../src/components/AddResource';

describe('AddResource Component', () => {
  const wrapper = mount(<AddResource />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().amenity).toEqual('');
  });

  it('includes buttonText prop', () => {
    expect(wrapper.find('MrmModal').prop('buttonText')).toEqual('Add Resource');
  });

  it('should pop-up a modal', () => {
    wrapper.find('#modal-button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('includes title prop', () => {
    const resourceModal = wrapper.find('div.add-resource-modal h2');

    expect(resourceModal.text()).toEqual('ADD RESOURCE');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should have one labels', () => {
    const modalForm = wrapper.find('label');
    expect(modalForm).toHaveLength(1);
  });

  it('should have one input', () => {
    const modalForm = wrapper.find('input');
    expect(modalForm).toHaveLength(1);
  });

  it('modal should have one button', () => {
    const modalButton = wrapper.find('div.add-resource-modal button');
    expect(modalButton).toHaveLength(1);
  });

  it('inputs should respond to state changes', () => {
    wrapper
      .find('#amenity')
      .simulate('change', { target: { name: 'amenity', value: 'jabra speaker' } });
    expect(wrapper.find('#amenity').props().value).toBe('jabra speaker');
  });

  it('closes the modal on submission', async () => {
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault });
    expect(wrapper.state('closeModal')).toEqual(false);
    expect(preventDefault).toBeCalled();
  });
});
