import React from 'react';
import { mount } from 'enzyme';
import RoomCard from '../../../src/components/rooms/Rooms';
import * as mutationHelpers from '../../../src/components/helpers/mutationHelpers/rooms';
import * as notification from '../../../src/utils/notification';

const props = {
  roomImage: 'Image',
  roomName: 'Obudu',
  floorName: '4th Floor',
  wingName: 'Big Apple',
  blockName: '3j',
  numberOfSeats: 5,
  numberOfResources: 6,
  roomLabels: [],
  roomId: '78',
  updatedRoom: jest.fn(),
};
describe('Unit test for room  Component', () => {
  const setup = (myProps = props) => mount(<RoomCard {...myProps} />);
  const wrapper = setup();
  it('Should  call the updatedRoom function ', async () => {
    jest.spyOn(mutationHelpers, 'deleteRoom').mockResolvedValue({ roomName: 'idanre' });
    jest.spyOn(notification, 'default').mockReturnValue(jest.fn().mockReturnValue('Ok'));
    const updatedRoomSpy = jest.spyOn(wrapper.instance().props, 'updatedRoom').mockImplementation();
    await wrapper.instance().roomDelete()();
    expect(updatedRoomSpy).toBeCalled();
  });

  it('Should run the catch block when there is an error in the roomDelete function', async () => {
    jest.spyOn(mutationHelpers, 'deleteRoom').mockRejectedValue('ERRORS');
    await wrapper.instance().roomDelete()();
    expect(wrapper.state().error).toEqual('Network error, kindly try again!');
  });
  it('Should render room setup card component correctly', () => {
    expect(wrapper.find('.room-setup-card').exists()).toBe(true);
    expect(wrapper.find('.room-setup-card').children().length).toBe(2);
    expect(wrapper.find('.room-details-container').children().length).toBe(5);
  });

  it('should call the roomDelete function when the delete button is clicked', () => {
    const roomDeleteSpy = jest.spyOn(wrapper.instance(), 'roomDelete').mockImplementation();
    wrapper.instance().deleteRoomModal.current.setState({
      role: '2',
      isOpen: true,
    });
    wrapper.update();
    wrapper
      .find('.form-action-buttons')
      .childAt(1)
      .simulate('click');
    expect(roomDeleteSpy).toHaveBeenCalled();
    roomDeleteSpy.mockClear();
  });
});
