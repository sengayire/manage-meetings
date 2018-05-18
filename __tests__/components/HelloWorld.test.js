import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import HelloWorld from '../../src/components/HelloWorld';

describe('HelloWorld component', () => {
  const wrapper = shallow(<HelloWorld />);

  it('should render without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HelloWorld />, div);
  });

  it('should render correctly in memory', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should respond to button click', () => {
    wrapper.find('.hello').simulate('click');
    wrapper.update();
    expect(wrapper.state().clicks).toEqual(1);
  });

  it('should reset the number of clicks when reset button is clicked', () => {
    wrapper.setState({ clicks: 0 });
    // increment clicks by one
    wrapper.find('.hello').simulate('click');
    expect(wrapper.state().clicks).toEqual(1);
    wrapper.update();
    // decrement  clicks
    wrapper.find('[disabled=false]').simulate('click');
    wrapper.update();
    // check whether clicks are zero
    expect(wrapper.state().clicks).toEqual(0);
  });
});
