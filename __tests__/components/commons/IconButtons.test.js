import React from 'react';
import { mount } from 'enzyme';
import IconButtons from '../../../src/components/commons/IconButtons';

describe('IconButtons Component', () => {
  const wrapper = mount(<IconButtons
    buttonText="button"
    modalButtonClassName="button"
    openModal={jest.fn()}
  />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles onButtonTextChange()', () => {
    expect(wrapper.instance().onButtonTextChange());
  });
});
