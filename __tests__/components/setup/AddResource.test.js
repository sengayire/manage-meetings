import React from 'react';
import { mount } from 'enzyme';
import AddResources from '../../../src/components/setup/resources/AddResources';

describe('AddResources component', () => {
  const wrapper = mount(<AddResources />);

  it('changes state value of closeModal to true when handleCloseModal function is called', () => {
    expect(wrapper.instance().state.closeModal).toBe(false);
    wrapper.instance().handleCloseModal();
    expect(wrapper.instance().state.closeModal).toBe(true);
  });

  it('should update the state of resource after handleInputChange is called', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().forceUpdate();
    wrapper.find('#modal-button').simulate('click');
    const resourceNameInput = wrapper.find('input[type="text"]');
    expect(wrapper.instance().state.resource).toEqual('');
    resourceNameInput.simulate('change', { target: { name: 'resource', value: 'pen' } });
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.resource).toEqual('pen');
  });

  it('should call handleCloseModal on clicking cancel button on modal', () => {
    wrapper.setState({ closeModal: false });
    const spy = jest.spyOn(wrapper.instance(), 'handleCloseModal');
    wrapper.instance().forceUpdate();
    wrapper.find('.form-action-buttons').childAt(0).simulate('click');
    const cancel = wrapper.find('button');
    cancel.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
