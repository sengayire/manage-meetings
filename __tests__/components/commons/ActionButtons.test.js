import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtons } from '../../../src/components/commons';

describe('ActionButton component', () => {
  const handleClickCancel = jest.fn();
  const wrapper = shallow(<ActionButtons onClickCancel={handleClickCancel} withCancel />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').length).toBe(2);
  });

  it('should respond to click events', () => {
    wrapper.find('.cancel-button').simulate('click');
    expect(handleClickCancel).toHaveBeenCalled();
  });

  it('should not display cancel button if withCancel is false', () => {
    wrapper.setProps({ withCancel: false });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').length).toBe(2);
  });
});
