import React from 'react';
import { mount } from 'enzyme';

import { roomLocations } from '../../../__mocks__/rooms/Rooms';
import AddRoomNairobi from '../../../src/components/rooms/AddRoomNairobi';

describe('AddRoomNairobi', () => {
  const wrapper = mount(<AddRoomNairobi locations={roomLocations} />);

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

  it('should have two select and two text input elements', () => {
    expect(wrapper.find('Input').length).toBe(2);
    expect(wrapper.find('SelectInput').length).toBe(2);
  });


  it('should handle change in roomName', () => {
    wrapper.find('input#roomName')
      .simulate('change', { target: { name: 'roomName', value: 'Accra' } });
    wrapper.update();
    expect(wrapper.find('input#roomName').prop('defaultValue')).toEqual('Accra');
  });

  it('should handle change in roomCapacity', () => {
    wrapper.find('input#roomCapacity')
      .simulate('change', { target: { name: 'roomCapacity', value: 2 } });
    wrapper.update();
    expect(wrapper.find('input#roomCapacity').prop('defaultValue')).toEqual(2);
  });

  it('should handle change in officeBlock', () => {
    wrapper.find('select#officeBlock')
      .simulate('change', { target: { name: 'officeBlock', value: 'A' } });
    wrapper.update();
    expect(wrapper.find('select#officeBlock').prop('value')).toEqual('A');
  });

  it('should handle change in officeFloor', () => {
    wrapper.find('select#officeFloor')
      .simulate('change', { target: { name: 'officeFloor', value: 'First Floor' } });
    wrapper.update();
    expect(wrapper.find('select#officeFloor').prop('value')).toEqual('First Floor');
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
