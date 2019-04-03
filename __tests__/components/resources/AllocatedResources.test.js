import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import AllocatedResources from '../../../src/components/resources/AllocatedResources';
import resourcesData from '../../../src/fixtures/resourcesData';

describe('Unit test for room allocated to a resources', () => {
  const props = { resourcesData, title: 'my-title' };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MockedProvider>
        <AllocatedResources {...props} />
      </MockedProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('Should display the modal containing the rooms allocated to a resources', () => {
    const component = wrapper.find('roomsAllocatedToResources');
    expect(component.find('.rooms-allocated-container').exists()).toBe(true);
    expect(component.find('.rooms-allocated-container').children().length).toBe(1);
  });
});
