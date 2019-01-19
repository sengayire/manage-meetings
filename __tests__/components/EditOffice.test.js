import React from 'react';
import { shallow } from 'enzyme';
import { EditOffice } from '../../src/components/EditOffice';

describe('EditOffice Component', () => {
  const props = {
    editOffice: jest.fn(),
    officeName: 'Epic',
    officeId: '1',
    officeLocation: 'Lagos',
  };
  let wrapper = shallow(<EditOffice {...props} />);
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: '',
      value: '',
    },
  };

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#officeName').simulate('change', { target: { name: 'officeName', value: 'Epic building' } });
    expect(wrapper.find('#officeName').props().value).toBe('Epic building');
    expect(wrapper.state('officeName')).toEqual('Epic building');
  });

  it('should handle handleEditOffice() when editOffice is rejected', () => {
    wrapper.setProps({
      editOffice: jest.fn(() => Promise.reject()),
    });
    wrapper.setState({
      officeName: 'Epic Tower',
    });
    wrapper.update();
    wrapper.instance().handleEditOffice(event);
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handle handleEditOffice() when editOffice is resolved', () => {
    const newProps = {
      editOffice: jest.fn(() => Promise.resolve()),
      officeName: 'Epic',
      officeId: '1',
      officeLocation: 'Lagos',
    };
    wrapper = shallow(<EditOffice {...newProps} />);
    wrapper.instance().handleEditOffice(event);
    expect(newProps.editOffice).toBeCalled();
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });
});
