import React from 'react';
import { shallow } from 'enzyme';
import { DeleteOffice } from '../../../src/components/offices/DeleteOffice';
import { AddOffice } from '../../../src/components/offices/AddOffice'; //eslint-disable-line

describe('DeleteOffice Test Suite', () => {
  const initProps = {
    deleteOffice: jest.fn(),
    officeName: 'EPIC TOWER',
    id: 'delete-modal',
    officeId: '11',
  };
  let wrapper = shallow(<DeleteOffice {...initProps} />);

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().closeModal).toEqual(false);
  });

  it('should have a title prop', () => {
    expect(wrapper.prop('title')).toEqual('DELETE OFFICE');
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
      deleteOffice: jest.fn(() => Promise.reject()),
      notification: jest.fn(),
      officeName: 'EPIC TOWER',
      id: 'delete-modal',
      officeId: '11',
    };
    wrapper = shallow(<DeleteOffice {...props} />);

    wrapper.instance().handleDeleteOffice();
    expect(props.deleteOffice).toBeCalled();
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
      deleteOffice: jest.fn(() => Promise.resolve(office)),
      notification: jest.fn(),
      officeName: 'EPIC TOWER',
      id: 'delete-modal',
      officeId: '11',
    };
    wrapper = shallow(<DeleteOffice {...props} />);

    wrapper.instance().handleDeleteOffice();
    expect(props.deleteOffice).toBeCalled();
  });
});
