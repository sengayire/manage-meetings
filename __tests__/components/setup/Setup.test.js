import React from 'react';
import { shallow } from 'enzyme';
import Setup from '../../../src/components/setup/Setup';


describe('setup component', () => {
  const wrapper = shallow(<Setup handleClick={jest.fn()} />);

  it('should find an instance of Apollo(WelcomePage)', () => {
    expect(wrapper.find('Apollo(WelcomePage)').exists()).toBeTruthy();
  });

  it('should  change the value of isResponsePageVisible to true', () => {
    expect(wrapper.state().isBuildingLevelVisible).toEqual(false);
    wrapper.instance().handleClick();
    expect(wrapper.state().isBuildingLevelVisible).toEqual(true);
  });

  it('should  change the value of isActive to true', () => {
    expect(wrapper.state().isActive).toEqual(false);
    wrapper.instance().handleClickBuilding();
    expect(wrapper.state().isActive).toEqual(true);
  });
});
