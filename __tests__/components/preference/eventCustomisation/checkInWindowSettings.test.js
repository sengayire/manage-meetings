import React from 'react';
import { shallow, mount } from 'enzyme';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import CheckInWindowSettings from '../../../../src/components/preference/eventCustomisation/checkInWindowSettings';


describe('Tests for CheckInWindowSettings Component', () => {
  const Wrapper = mount(<CheckInWindowSettings />);
  const shallowWrapper = shallow(<CheckInWindowSettings />);

  it('renders correctly from memory', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('calls handleChange function', () => {
    expect(shallowWrapper.instance().handleChange());
  });

  it('sets value in state when user clicks on one of the time options', () => {
    const radioButton = Wrapper.find(RadioGroup).find(RadioButton).first();
    radioButton.find('input').simulate('click', { target: { checked: true } });
    expect(Wrapper.instance().state.value).toEqual('2');
  });
});
