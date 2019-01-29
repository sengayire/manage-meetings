import React from 'react';
import { shallow } from 'enzyme';
import { EditWing } from '../../../src/components/wing/EditWing';

describe('EditWing Component', () => {
  const props = {
    editWing: jest.fn(),
    wingName: 'Epic',
    wingId: '1',
  };
  let wrapper = shallow(<EditWing {...props} />);
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
    wrapper.find('#wingName').simulate('change', { target: { name: 'wingName', value: 'Epic wing' } });
    expect(wrapper.find('#wingName').props().value).toBe('Epic wing');
    expect(wrapper.state('wingName')).toEqual('Epic wing');
  });

  it('should handle handleEdit wing() when editWing is rejected', () => {
    wrapper.setProps({
      editWing: jest.fn(() => Promise.reject()),
    });
    wrapper.setState({
      wingName: 'Epic Wing',
    });
    wrapper.update();
    wrapper.instance().handleEditWing(event);
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('should handle handleEditwing() when editWing is resolved', () => {
    const newProps = {
      editWing: jest.fn(() => Promise.resolve()),
      wingName: 'Epic wing',
      wingId: '1',
    };
    wrapper = shallow(<EditWing {...newProps} />);

    wrapper.instance().handleEditWing(event);
    expect(newProps.editWing).toBeCalled();
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });
});
