import React from 'react';
import { mount } from 'enzyme';

import AddRoom from '../../../src/components/rooms/AddRoom';

describe('AddRoom', () => {
  const wrapper = mount(<AddRoom />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not have a form before modal pops up', () => {
    expect(wrapper.find('form')).toHaveLength(0);
  });


  it('should pop up a modal when modal button is clicked', () => {
    const modalButton = wrapper.find('#modal-button');
    expect(modalButton).toHaveLength(1);

    modalButton.simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have one select and one text input element', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('SelectInput').length).toBe(1);
  });


  it('should respond to on change events of the input and selects', () => {
    wrapper.find('input#roomName').simulate('change', { target: { name: 'roomName', value: 'HighLan' } });
    wrapper.find('select#roomLocation').simulate('change', { target: { name: 'roomLocation', value: 'Kampala' } });
    wrapper.update();
    expect(wrapper.state().roomName).toEqual('HighLan');
    expect(wrapper.state().roomLocation).toEqual('Kampala');
  });


  it('should  have form and close the modal when the form is submitted', () => {
    const preventDefault = jest.fn();
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);

    form.simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(wrapper.find('form')).toHaveLength(0);
  });
});
