import React from 'react';
import { shallow } from 'enzyme';
import EditUser from '../../src/components/EditUser';

describe('EditUser Component', () => {
  const wrapper = shallow(<EditUser userName="name" userLocation="location" accessLevel="accessLevel" />);
  const preventDefault = jest.fn();

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles handleCloseModal()', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('handles handleModalStateChange()', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });

  it('handles handleEditUser()', () => {
    wrapper.instance().handleEditUser({ preventDefault });
    expect(wrapper.state('closeModal')).toEqual(true);
  });

  it('inputs should respond change in userName', () => {
    wrapper.find('#userName')
      .simulate('change', { target: { name: 'userName', value: 'Richard' } });
    expect(wrapper.state('userName')).toEqual('Richard');
  });

  it('inputs should respond change in userLocation', () => {
    wrapper.find('#userLocation')
      .simulate('change', { target: { name: 'userLocation', value: 'Lagos' } });
    expect(wrapper.state('userLocation')).toEqual('Lagos');
  });

  it('inputs should respond change in accessLevel', () => {
    wrapper.find('#accessLevel')
      .simulate('change', { target: { name: 'accessLevel', value: 'Default User' } });
    expect(wrapper.state('accessLevel')).toEqual('Default User');
  });
});

