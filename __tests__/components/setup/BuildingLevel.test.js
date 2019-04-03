import React from 'react';
import { mount } from 'enzyme';
import BuildingSetup from '../../../src/components/setup/BuildingLevel';
import * as QueryHelper from '../../../src/components/helpers/QueriesHelpers';
import { user, allLocations, level } from '../../../__mocks__/setup/BuildingLevel';

describe('building setup component', () => {
  let wrapper;
  let button;
  const handleClick = jest.fn();

  const mockedClient = {
    readQuery: jest.fn().mockImplementationOnce(() => user),
    query: jest.fn(),
  };
  beforeEach(() => {
    wrapper = mount(<BuildingSetup handleClick={handleClick} client={mockedClient} />);
  });

  it('should update the state when getUsersLocation is called', async () => {
    jest.spyOn(QueryHelper, 'getUserDetails').mockImplementationOnce(() => user);
    jest.spyOn(QueryHelper, 'getAllLocations').mockImplementationOnce(() => allLocations);
    expect(wrapper.state('user')).toEqual({});
    expect(wrapper.state('allLocations').length).toBe(0);
    await wrapper.instance().getUsersLocation();
    expect(wrapper.state('user')).toBe(user);
    expect(wrapper.state('allLocations').length).toBe(4);
  });

  it('should toggle active level', () => {
    expect(wrapper.instance().state.activeLevel).toBe(1);
    wrapper.instance().toggleActiveLevel({ target: { id: 2 } });
    expect(wrapper.instance().state.activeLevel).toBe(2);
  });

  it('should set initial state of levelsDetails property in LevelsForm to an empty array', () => {
    const {
      state: { levelsDetails },
    } = wrapper.instance().levels.current;
    expect(levelsDetails).toEqual([]);
  });

  it('should update state with levelDetails in LevelsForm', () => {
    expect(wrapper.instance().levels.current.state.levelsDetails.length).toBe(0);
    wrapper
      .find('.level-form')
      .childAt(0)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelTagName', value: 'Building' } });
    wrapper
      .find('.level-form')
      .childAt(1)
      .find('.level-input')
      .simulate('change', { target: { name: 'up', value: 1 } });
    wrapper
      .find('.level-form')
      .find('.form-input .input1')
      .childAt(0)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelName', value: 'Epic Tower' } });
    wrapper.find('.add-level-button').simulate('click');
    expect(wrapper.instance().levels.current.state.levelsDetails.length).toBe(1);
  });

  it('should remove Level Details', () => {
    wrapper
      .find('.level-form')
      .childAt(0)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelTagName', value: 'Building' } });
    wrapper
      .find('.level-form')
      .childAt(1)
      .find('.level-input')
      .simulate('change', { target: { name: 'up', value: 1 } });
    wrapper
      .find('.level-form')
      .find('.form-input .input1')
      .childAt(0)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelName', value: 'Epic Tower' } });
    wrapper.find('.add-level-button').simulate('click');
    expect(wrapper.instance().levels.current.state.levelsDetails.length).toBe(1);
    wrapper.instance().removeLevel(level)();
    expect(wrapper.instance().levels.current.state.levelsDetails.length).toBe(0);
  });
  it('should not update the state with empty level details', () => {
    wrapper.find('.add-level-button').simulate('click');
    expect(wrapper.instance().levels.current.state.levelsDetails.length).toBe(0);
  });
  it('renders with the level container', () => {
    const levelContainer = wrapper.find('.level-container');
    expect(levelContainer).toHaveLength(1);
  });

  it('renders with two cards', () => {
    const formCard = wrapper.find('.form-card');
    expect(formCard).toHaveLength(2);
  });

  it('renders with a form section with a heading and subheading', () => {
    const formSection = wrapper.find('.form-area');
    const formSectionHeading = wrapper.find('.form-area h4');
    const formSectionSubHeading = wrapper.find('.form-header p');
    expect(formSection).toHaveLength(1);
    expect(formSectionHeading.text()).toContain('Setup your building');
    expect(formSectionSubHeading.text()).toContain('Plan the Levels within your building');
  });

  it('renders with a level description', () => {
    const levelDescription = wrapper.find('.levels-desc p');
    expect(levelDescription.text()).toContain(
      'Levels can be Buildings, Blocks, Floors, Wings, Rooms, etc',
    );
  });

  it('renders with a list of level add options', () => {
    const levelAddOptions = wrapper.find('.levels-add-options');
    const optionsList = wrapper.find('.form-options-list');
    expect(levelAddOptions).toHaveLength(1);
    expect(optionsList).toHaveLength(1);
  });

  it('renders with form, 3 input fields and 2 buttons', () => {
    const form = wrapper.find('form');
    const input = wrapper.find('input');
    button = wrapper.find('.level-form Button');
    expect(form).toHaveLength(1);
    expect(input).toHaveLength(2);
    expect(button).toHaveLength(1);
  });
});
