import React from 'react';
import { mount } from 'enzyme';
import AllocatedResources from '../../../src/components/resources/AllocatedResources';
import resourcesData from '../../../src/fixtures/resourcesData';

describe('Unit test for room allocated to a resources', () => {
  const props = { resourcesData };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<AllocatedResources {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display the modal containing the rooms allocated to a resources', () => {
    wrapper.instance().toggleModal();
    wrapper.update();
    expect(wrapper.find('.rooms-allocated-container').exists()).toBe(true);
    expect(wrapper.find('.rooms-allocated-container').children().length).toBe(1);
    expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('.modal').children().length).toBe(2);
    expect(wrapper.find('.number-of-rooms').exists()).toBe(true);
    expect(wrapper.find('.single-resource').exists()).toBe(true);
    expect(wrapper.find('.room-name-resource').exists()).toBe(true);
  });
});
