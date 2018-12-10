import React from 'react';
import { shallow } from 'enzyme';
import { EditFloor } from '../../src/components/EditFloor';

describe('EditFloor Component', () => {
  const props = {
    editFloor: jest.fn(),
    floorName: 'Fourth Floor',
    floorId: '1',
    floorLocation: 'The Dojo 2',
  };
  let wrapper = shallow(<EditFloor {...props} />);
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
    wrapper.find('#floorName').simulate('change', {
      target: { name: 'floorName', value: 'Epic building' },
    });
    expect(wrapper.find('#floorName').props().value).toBe('Epic building');
    expect(wrapper.state('floorName')).toEqual('Epic building');
  });

  it('should handle handleEditFloor() when editFloor is rejected', () => {
    wrapper.setProps({
      editFloor: jest.fn(() => Promise.reject()),
    });
    wrapper.update();
    wrapper.instance().handleEditFloor(event);
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handle handleEditFloor() when editFloor is resolved', () => {
    const newProps = {
      editFloor: jest.fn(() => Promise.resolve()),
      floorName: 'Epic',
      floorId: '1',
      floorLocation: 'Lagos',
    };
    wrapper = shallow(<EditFloor {...newProps} />);

    wrapper.instance().handleEditFloor(event);
    expect(newProps.editFloor).toBeCalled();
    expect(wrapper.state('closeModal')).toEqual(true);
  });
});
