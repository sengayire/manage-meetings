import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import DeleteRoomComponent, { DeleteRoom } from '../../src/components/DeleteRoom';
import DELETE_ROOM from '../../src/graphql/mutations/Rooms';

describe('DeleteOffice Test Suite', () => {
  const request = {
    query: DELETE_ROOM,
    variables: { roomId: 1 },
  };
  const deletedRoom = { name: 'Rabat', id: 1 };
  const result = { data: { deletedRoom } };

  const wrapperCode = (
    <MockedProvider
      mocks={[{ request, result }]}
      addTypename={false}
    >
      <DeleteRoomComponent roomName="Rabat" roomId="1" refetch={jest.fn(() => Promise.resolve())} />
    </MockedProvider>
  );
  const wrapper = mount(wrapperCode);
  const deleteComponent = wrapper.find('DeleteRoom');

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pop up a modal when delete button is clicked', () => {
    const modalButton = wrapper.find('#modal-button');

    modalButton.simulate('click');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should change modal state', () => {
    deleteComponent.instance().state = {
      closeModal: true,
    };
    deleteComponent.instance().handleCloseModal();
    expect(deleteComponent.instance().state.closeModal).toBeFalsy();
  });

  it('should delete room succesfully', () => {
    const newProps = {
      deleteRoom: jest.fn(() => Promise.resolve(result)),
    };
    const newWrapper = shallow(<DeleteRoom roomName="Rabat" roomId="1" {...newProps} />);

    newWrapper.setState({ closeModal: false });
    newWrapper.instance().handleDeleteRoom();
    expect(newProps.deleteRoom).toHaveBeenCalled();
  });

  it('should return an error when deleting room', () => {
    const newProps = {
      deleteRoom: jest.fn(() =>
        Promise.reject(new Error('You are not authorized to perform this action'))),
    };
    const newWrapper = shallow(<DeleteRoom roomName="Rabat" roomId="1" {...newProps} />);

    newWrapper.instance().handleDeleteRoom();
    expect(newProps.deleteRoom).toHaveBeenCalled();
  });
});
