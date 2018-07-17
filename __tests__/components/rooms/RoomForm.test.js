import React from 'react';
import { mount } from 'enzyme';

import RoomForm from '../../../src/components/rooms/RoomForm';
import { roomLocations } from '../../../__mocks__/rooms/Rooms';

describe('RoomForm', () => {
  const handleSubmit = jest.fn();
  const handleCloseModal = jest.fn();

  const wrapper = mount(<RoomForm
    onCloseModalRequest={handleCloseModal}
    onSubmit={handleSubmit}
    locations={roomLocations}
  />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have one select and one text input element', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('SelectInput').length).toBe(1);
  });

  it('should respond to on change events of the input and selects', () => {
    wrapper
      .find('input#roomName')
      .simulate('change', { target: { name: 'roomName', value: 'HighLan' } });
    wrapper
      .find('select#roomLocation')
      .simulate('change', {
        target: { name: 'roomLocation', value: 'Kampala' },
      });
    wrapper.update();
    expect(wrapper.state().roomName).toEqual('HighLan');
    expect(wrapper.state().roomLocation).toEqual('Kampala');
  });
});
