import React from 'react';
import { shallow } from 'enzyme';
import AddQuestion from '../../src/components/AddQuestion';

describe('AddQuestion component', () => {
  const wrapper = shallow(<AddQuestion />);

  it('should be rendered without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display the input fields in the modal', () => {
    expect(wrapper.find('input')).toHaveLength(5);
  });

  it('should toggle modal visibility by changing state when cancel is clicked', () => {
    expect(wrapper.state().closeModal).toBe(false);
    wrapper.find('.button-container').childAt(1).simulate('click');
    expect(wrapper.state().closeModal).toBe(true);
  });
});
