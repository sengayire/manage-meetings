import React from 'react';
import { shallow } from 'enzyme';
import SetupPage from '../../../src/components/setup/Setup';
import Spinner from '../../../src/components/commons/Spinner';
import * as queryHelper from '../../../src/components/helpers/QueriesHelpers';

describe('setup component', () => {
  const handleClick = () => jest.fn();
  let wrapper;
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(SetupPage.prototype, 'componentDidMount').mockImplementationOnce(() => Promise.resolve());
    wrapper = shallow(<SetupPage handleClick={handleClick} />);
    wrapper.setState({ centerRoomCount: 0 });
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('should call componentDidMount once on render', () => {
    spy = jest.spyOn(wrapper.instance(), 'getStructures').mockImplementationOnce(() => ({}));
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should change the centerRoomCount state when getRoomCount function is called', async () => {
    jest.spyOn(queryHelper, 'getRoomsStructure').mockImplementationOnce(() => ({ allStructures: ['1', '2'] }));
    expect(wrapper.state().isStructureSetup).toBe(false);
    jest.spyOn(queryHelper, 'getRoomList').mockImplementationOnce(() => ({ allRooms: { rooms: ['1', '2'] } }));
    await wrapper.instance().getStructures();
    expect(wrapper.state().isStructureSetup).toBe(true);
  });

  it('should show white blank component with spinner when getRoomsStructure is still loading', () => {
    const { visibleLevel } = wrapper.state();
    expect(visibleLevel).toEqual('WelcomePage');
    expect(wrapper.state().loaded).toEqual(false);
    expect(wrapper.hasClass('setup_container')).toBe(true);
    expect(wrapper.contains(<Spinner />)).toBe(true);
  });

  it('should change the state to the value passed in to the handleClick function', () => {
    const page = ['BuildingLevel', 'SetupInfoPage', 'RoomSetupView', 'WelcomePage'];
    expect(wrapper.state().visibleLevel).toEqual('WelcomePage');
    wrapper.setState({ loaded: true });
    wrapper.instance().handleClick(page[0])();
    let stateValue = wrapper.state().visibleLevel;
    expect(stateValue).toEqual(page[0]);
    wrapper.instance().handleClick(page[1])();
    stateValue = wrapper.state().visibleLevel;
    expect(stateValue).toEqual(page[1]);
    wrapper.instance().handleClick(page[2])();
    stateValue = wrapper.state().visibleLevel;
    expect(stateValue).toEqual(page[2]);
    wrapper.instance().handleClick(page[3])();
    stateValue = wrapper.state().visibleLevel;
    expect(stateValue).toEqual(page[3]);
  });
});
