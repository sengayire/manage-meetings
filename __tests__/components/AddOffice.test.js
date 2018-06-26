import React from 'react';
import { shallow } from 'enzyme';
import AddOffice from '../../src/components/AddOffice';

describe('AddOffice Component', () => {
  const wrapper = shallow(<AddOffice />);
  const preventDefault = jest.fn();


  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have initial state', () => {
    expect(wrapper.state().buildingName).toEqual('');
    expect(wrapper.state().countryName).toEqual('');
    expect(wrapper.state().timeZone).toEqual('');
  });

  it('includes title prop', () => {
    expect(wrapper.prop('title')).toEqual('ADD OFFICE');
  });

  it('includes buttonText prop', () => {
    expect(wrapper.prop('buttonText')).toEqual('Add Office');
  });

  it('should have a form', () => {
    const modalForm = wrapper.find('form');
    expect(modalForm).toHaveLength(1);
  });

  it('should have three labels', () => {
    const modalForm = wrapper.find('label');
    expect(modalForm).toHaveLength(3);
  });

  it('should have three inputs', () => {
    const modalForm = wrapper.find('input');
    expect(modalForm).toHaveLength(3);
  });

  it('should have one button', () => {
    const modalForm = wrapper.find('button');
    expect(modalForm).toHaveLength(1);
  });

  it('inputs should trespond to state chnages', () => {
    wrapper.find('#buildingName').simulate('change', { target: { name: 'buildingName', value: 'epic' } });
    expect(wrapper.find('#buildingName').props().value).toBe('epic');
  });


  it('handles handleCloseModal()', () => {
    expect(wrapper.instance().handleCloseModal());
  });

  it('handles handleModalStateChange()', () => {
    expect(wrapper.instance().handleModalStateChange());
  });

  it('handles handleAddOffice()', () => {
    expect(wrapper.instance().handleAddOffice({ preventDefault }));
  });
});