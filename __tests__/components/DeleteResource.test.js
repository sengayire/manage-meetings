import React from 'react';
import { shallow } from 'enzyme';
import data from '../../__mocks__/data';
import DeleteResource from '../../src/components/DeleteResource';

describe('DeleteResource Component', () => {
  const wrapper = shallow(<DeleteResource
    handleCloseModal={jest.fn()}
    toDelete={data.office}
    openModal
  />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('contains two buttons', () => {
    expect(wrapper.find('button')).toHaveLength(2);
  });
  it('contains two paragraphs', () => {
    expect(wrapper.find('p')).toHaveLength(2);
  });
  it('should have a `Cancel` button', () => {
    expect(wrapper
      .find('.button-container')
      .childAt(0)
      .text()).toBe('Cancel');
  });
  it('should have a `Submit` button', () => {
    expect(wrapper
      .find('.button-container')
      .childAt(1)
      .text()).toBe('Submit');
  });
  it('should close `ESC` key', () => {
    wrapper.find('.delete-modal-container').simulate('keyUp', { keyCode: 27 });
    expect(wrapper.state('closeModal')).toEqual(true);
  });
  it('should accept `Modal` state changes', () => {
    wrapper.instance().handleModalStateChange();
    expect(wrapper.state('closeModal')).toEqual(false);
  });
  describe('Responds to cancel click', () => {
    it('should hide model once `Cancel` button is clicked', () => {
      wrapper.find('.delete-resource-modal .modal-cancel').simulate('click');
      expect(wrapper.state('closeModal')).toEqual(true);
    });
  });
});
