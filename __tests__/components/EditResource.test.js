import React from 'react';
import { shallow } from 'enzyme';
import EditResource from '../../src/components/EditResource';

describe('EditResource Component', () => {
  const props = {
    resourceName: 'Jabra Speaker',
  };
  const wrapper = shallow(<EditResource {...props} />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should have two button', () => {
    const modalForm = wrapper.find('button');
    expect(modalForm).toHaveLength(2);
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('handles handleEditResource()', () => {
    wrapper.instance().handleEditResource({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('inputs should respond to state changes', () => {
    wrapper.find('#resourceName').simulate('change', { target: { name: 'name', value: 'Jabra Speaker' } });
    // expect(wrapper.find('#resourceName').props().value).toBe('Jabra Speaker');
    expect(wrapper.state('resourceName')).toEqual('Jabra Speaker');
  });
});
