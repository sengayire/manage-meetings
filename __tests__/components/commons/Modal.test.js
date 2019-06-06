import React from 'react';
import { mount } from 'enzyme';
import MrmModal from '../../../src/components/commons/Modal';

describe('MrmModal Component', () => {
  const wrapper = mount(<MrmModal
    title="hello"
    buttonText="button"
    handleCloseRequest={jest.fn()}
    closeModal
    children={<div className="test-div">Hello</div>}
  />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have one button', () => {
    const modalForm = wrapper.find('button');
    expect(modalForm).toHaveLength(1);
    expect(modalForm.text()).toEqual('button');
  });

  it('handles openModal', () => {
    expect(wrapper.instance().openModal());
  });

  it('handles closeModal()', () => {
    expect(wrapper.instance().closeModal());
  });

  it('handles componentDidUpdate()', () => {
    expect(wrapper.instance().componentDidUpdate('foo', {}, jest.fn()));
  });
});
