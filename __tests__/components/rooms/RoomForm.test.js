import React from 'react';
import { mount } from 'enzyme';

import { RoomForm } from '../../../src/components/rooms/RoomForm';
import { roomLocations, formDetails } from '../../../__mocks__/rooms/Rooms';

describe('RoomForm', () => {
  let handleSubmit = jest.fn();
  const handleCloseModal = jest.fn();
  const wrapper = mount(<RoomForm
    onCloseModalRequest={handleCloseModal}
    onSubmit={handleSubmit}
    handleInputChange={jest.fn()}
    locations={roomLocations || ''}
    formDetails={formDetails}
  />);

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: '',
      value: '',
    },
  };

  const wrapperValue = wrapper.find('RoomForm');
  it('should call handleSubmit', () => {
    const action = wrapperValue.instance();
    handleSubmit = jest.spyOn(wrapperValue.instance(), 'handleSubmit');
    action.handleSubmit(event);
    expect(handleSubmit).toBeCalled();
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have one select and one text input element', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('SelectInput').length).toBe(1);
    expect(wrapper.find('ActionButtons').length).toBe(1);
  });
});
