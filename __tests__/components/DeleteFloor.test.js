import React from 'react';
import { shallow } from 'enzyme';
import { DeleteFloor } from '../../src/components/DeleteFloor';

describe('DeleteFloor Test Suite', () => {
  const initProps = {
    deleteFloor: jest.fn(),
    floorName: 'Fourth Floor',
    id: 'delete-modal',
    floorId: '1',
  };
  let wrapper = shallow(<DeleteFloor {...initProps} />);

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().closeModal).toEqual(false);
  });

  it('should have a title prop', () => {
    expect(wrapper.prop('title')).toEqual('DELETE FLOOR');
  });

  it('should have a buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Delete');
  });

  it('should handle state change', () => {
    // Change the state of the modal to `Closed`
    wrapper.instance().handleCloseModal();
    // After a state change and expect state to toggle
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('should handle handleDeleteOffice() when deleteOffice is rejected', () => {
    const props = {
      deleteFloor: jest.fn(() => Promise.reject()),
      notification: jest.fn(),
      floorName: 'Fourth Floor',
      id: 'delete-modal',
      floorId: '1',
    };
    wrapper = shallow(<DeleteFloor {...props} />);
    // fake the event to pass to handleDeleteFloor
    const fakeEvent = { preventDefault: () => {} };
    wrapper.instance().handleDeleteFloor(fakeEvent);
    expect(props.deleteFloor).toBeCalled();
  });

  it('should handle handleDeleteOffice() when deleteOffice is resolved', () => {
    const office = {
      data: {
        deleteOffice: {
          office: {
            name: 'Epic Tower',
          },
        },
      },
    };
    const props = {
      deleteFloor: jest.fn(() => Promise.resolve(office)),
      notification: jest.fn(),
      floorName: 'EPIC TOWER',
      id: 'delete-modal',
      floorId: '11',
    };
    wrapper = shallow(<DeleteFloor {...props} />);
    // fake the event top pass to handleDeleteFloor
    const fakeEvent = { preventDefault: () => {} };
    wrapper.instance().handleDeleteFloor(fakeEvent);
    expect(props.deleteFloor).toBeCalled();
  });
});
