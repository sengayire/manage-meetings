import React from 'react';
import { mount, shallow } from 'enzyme';
import BuildingSetup from '../../../src/components/setup/BuildingLevel';
import * as QueryHelper from '../../../src/components/helpers/QueriesHelpers';
import { user, allLocations, validLevel, invalidLevel, mockDataStructure } from '../../../__mocks__/setup/BuildingLevel';
import { previewData, previeDataWithoutTag, previeDataWithoutQuantity, previeDataWithChildrenLessThanQuantity, previeDataWithChildWithEmptyName } from '../../../src/fixtures/previewData';
import * as orderByLevels from '../../../src/utils/formatSetupData';

describe('building setup component', () => {
  let wrapper;
  let button;
  const handleClick = jest.fn();
  beforeEach(() => {
    wrapper = mount(<BuildingSetup handleClick={handleClick} />);
  });
  describe('Validate child function', () => {
    wrapper = shallow(<BuildingSetup handleClick={handleClick} />);
    it('Should check that the child level is valid ', () => {
      const error = wrapper.instance().validateChild(validLevel, 2);
      expect(error).toEqual([]);
    });

    it('Should check that the child level is invalid', () => {
      const error = wrapper.instance().validateChild(invalidLevel, 2);
      expect(error.length).toBe(1);
    });
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
      .childAt(1)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelTagName', value: 'Building' } });
    wrapper
      .find('.level-form')
      .childAt(2)
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
    wrapper
      .find('.level-form')
      .childAt(1)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelTagName', value: 'Floors' } });
    wrapper
      .find('.level-form')
      .childAt(2)
      .find('.level-input')
      .simulate('change', { target: { name: 'up', value: 1 } });
    wrapper
      .find('.level-form')
      .find('.form-input .input1')
      .childAt(0)
      .find('.level-input')
      .simulate('change', { target: { name: 'levelName', value: 'One Floor' } });
    wrapper.find('.add-level-button').simulate('click');
    expect(wrapper.instance().levels.current.state.levelsDetails.length).toBe(2);
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
    expect(formSection).toHaveLength(2);
    expect(formSectionHeading.first().text()).toContain('Setup your building');
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
    expect(button).toHaveLength(2);
  });

  it('should call updateErrorState when addNewLevel is called', () => {
    const component = mount(<BuildingSetup handleClick={handleClick} />);
    const spy = jest.spyOn(component.instance().levels.current, 'updateErrorState');
    jest.spyOn(component.instance(), 'validateLevelsDetails').mockReturnValue(false);
    component.instance().levels.current.state.levelsDetails = previewData;
    component.instance().addNewLevel({ preventDefault: jest.fn(), target: { className: 'add' } });
    expect(spy).toHaveBeenCalled();
    component.instance().levels.current.state.levelsDetails = previeDataWithoutTag;
    component.instance().addNewLevel({ preventDefault: jest.fn(), target: { className: 'add' } });
    expect(spy).toHaveBeenCalled();
    component.instance().levels.current.state.levelsDetails = previeDataWithoutQuantity;
    component.instance().addNewLevel({ preventDefault: jest.fn(), target: { className: 'add' } });
    expect(spy).toHaveBeenCalled();
    component.instance().levels.current.state.levelsDetails
      = previeDataWithChildrenLessThanQuantity;
    component.instance().addNewLevel({ preventDefault: jest.fn(), target: { className: 'add' } });
    expect(spy).toHaveBeenCalled();
    component.instance().levels.current.state.levelsDetails = previeDataWithChildWithEmptyName;
    component.instance().addNewLevel({ preventDefault: jest.fn(), target: { className: 'add' } });
    expect(spy).toHaveBeenCalled();
  });

  it('should update the state of previewStructure when previewBuildingStructure is called', async () => {
    jest.spyOn(QueryHelper, 'getRoomsStructure').mockImplementationOnce(() => mockDataStructure);
    jest.spyOn(orderByLevels, 'orderByLevel').mockImplementationOnce(() => mockDataStructure);
    expect(wrapper.state('previewStructure').length).toBe(0);
    expect(wrapper.state('levelCounter')).toBe(1);
    expect(wrapper.state('backendStructure').length).toBe(0);
    await wrapper.instance().orderedStructure();
    expect(wrapper.state('previewStructure').length).toBe(1);
    expect(wrapper.state('levelCounter')).toBe(2);
    expect(wrapper.state('backendStructure')).toBe(1);
  });
});
