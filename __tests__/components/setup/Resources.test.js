import React from 'react';
import { mount } from 'enzyme';
import Resources from '../../../src/components/setup/resources/Resources';

fdescribe('Resources list component', () => {
  const wrapper = mount(<Resources />);

  it('should render div elements', () => {
    expect(wrapper.find('div')).toHaveLength(17);
  });

  it('should render buttons', () => {
    expect(wrapper.find('button')).toHaveLength(13);
  });

  it('should render add resource button', () => {
    expect(wrapper.find('AddResource')).toHaveLength(1);
  });

  it('should render resource items', () => {
    expect(wrapper.find('.resource-list-item')).toHaveLength(6);
  });
});
