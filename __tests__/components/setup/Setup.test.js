import React from 'react';
import { shallow } from 'enzyme';
import SetupPage from '../../../src/components/setup/Setup';

describe('setup component', () => {
  const handleClick = () => jest.fn();
  const wrapper = shallow(<SetupPage handleClick={handleClick} />);

  it('should find an instance of WelcomePage when the component renders.', () => {
    expect(wrapper.find('WelcomePage').exists()).toBeTruthy();
  });

  it('should  change the value of isBuildingLevelVisible to true when the handleClick function is called', () => {
    expect(wrapper.state().isBuildingLevelVisible).toEqual(false);
    wrapper.instance().handleClick('isBuildingLevelVisible')();
    expect(wrapper.state().isBuildingLevelVisible).toEqual(true);
  });

  it('should  change the value of isSetupInfoVisible to true when the handleClick function is called', () => {
    expect(wrapper.state().isSetupInfoVisible).toEqual(false);
    wrapper.instance().handleClick('isSetupInfoVisible')();
    expect(wrapper.state().isSetupInfoVisible).toEqual(true);
  });

  it('should  change the value of isRoomSetupViewVisible to true when the handleClick function is called', () => {
    expect(wrapper.state().isRoomSetupViewVisible).toEqual(false);
    wrapper.instance().handleClick()();
    expect(wrapper.state().isRoomSetupViewVisible).toEqual(true);
  });
});
