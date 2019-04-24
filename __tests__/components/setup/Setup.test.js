import React from 'react';
import { shallow } from 'enzyme';
import SetupPage from '../../../src/components/setup/Setup';

describe('setup component', () => {
  const handleClick = () => jest.fn();
  const wrapper = shallow(<SetupPage handleClick={handleClick} />);

  it('should find an instance of WelcomePage when the component renders.', () => {
    expect(wrapper.find('WelcomePage').exists()).toBeTruthy();
  });

  it('should  change the value of visibleLevel to BuildingLevel when the handleClick function is called with argument BuildingLevel', () => {
    expect(wrapper.state().visibleLevel).toEqual('WelcomePage');
    wrapper.instance().handleClick('BuildingLevel')();
    expect(wrapper.state().visibleLevel).toEqual('BuildingLevel');
  });

  it('should  change the value of visibleLevel to SetupInfoPage when the handleClick function is called with argument SetupInfoPage', () => {
    expect(wrapper.state().visibleLevel).toEqual('BuildingLevel');
    wrapper.instance().handleClick('SetupInfoPage')();
    expect(wrapper.state().visibleLevel).toEqual('SetupInfoPage');
  });

  it('should  change the value of visibleLevel to RoomSetupView when the handleClick function is called with argument RoomSetupView', () => {
    expect(wrapper.state().visibleLevel).toEqual('SetupInfoPage');
    wrapper.instance().handleClick('RoomSetupView')();
    expect(wrapper.state().visibleLevel).toEqual('RoomSetupView');
  });
});
