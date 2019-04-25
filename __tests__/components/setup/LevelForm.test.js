import React from 'react';
import { mount } from 'enzyme';
import LevelsForm from '../../../src/components/setup/LevelsForm';
import { oneLevelProp } from '../../../src/fixtures/Preview';
import { previewData } from '../../../src/fixtures/previewData';

describe('LevelForm component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<LevelsForm />);
  });

  it('should render the LevelForm with a label "Set a name for this level"', () => {
    wrapper.instance();
    const tagNameLabel = wrapper.find('label');
    expect(tagNameLabel.first().text()).toEqual('Set a name for this level');
  });

  it('should return a span with "This field cannot be blank" ' +
    'when the renderError function is called', () => {
    const errorSpan = wrapper.instance().renderError();
    expect(errorSpan.type).toEqual('span');
    expect(errorSpan.props.children).toEqual('This field cannot be blank');
  });

  it('should call renderParents when the component renders', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderParents');
    wrapper.setState({
      levelCounter: 2,
      levelsDetails: previewData,
    });
    wrapper.instance();
    expect(spy).toHaveBeenCalled();
  });

  it('should call updateChildArray when the parent selector' +
    ' is clicked after populating the level-input field with the child', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateChildArray');
    wrapper.setState({
      levelCounter: 2,
      levelsDetails: oneLevelProp,
    });

    let downButton = wrapper.find('.num-controls').childAt(1);
    downButton.simulate('click');
    let upButton = wrapper.find('.num-controls').childAt(0);
    upButton.simulate('click');
    downButton = wrapper.find('.num-controls').childAt(1);
    downButton.simulate('click');
    upButton = wrapper.find('.num-controls').childAt(0);
    upButton.simulate('click');
    wrapper.find('.level-input').at(2).simulate('change', { target: { name: 'levelName', value: 'Conakry' } });
    wrapper.find('.parent-list').simulate('click');
    expect(wrapper.find('.remove-parent')).toHaveLength(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should return a button with the text "Block A" when renderParents is called', () => {
    wrapper.setState({
      levelCounter: 2,
      levelsDetails: oneLevelProp,
    });

    let parentList = wrapper.find('.parent-list');
    expect(parentList).toHaveLength(0);
    const upButton = wrapper.find('.num-controls').childAt(0);
    upButton.simulate('click');
    parentList = wrapper.find('.parent-list');
    expect(parentList).toHaveLength(1);
    expect(parentList.text()).toEqual('Block A');
  });

  it('should cancelCurrentLevelSetup function passed from props when ' +
      'cancelCurrentLevelSetup function in the LevelForms is called', () => {
    const props = {
      cancelCurrentLevelSetup: jest.fn(),
    };
    const spy = jest.spyOn(props, 'cancelCurrentLevelSetup');
    wrapper.setState({
      levelCounter: 3,
    });
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setProps(props);
    wrapper.instance().cancelCurrentLevelSetup(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call updateChildArray when populateLevelDetails is called with the type as levelName', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateChildArray');
    wrapper.setState({
      levelCounter: 2,
      levelsDetails: previewData,
    });
    wrapper.instance().populateLevelDetails(previewData[1], 'levelName', 2);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(2, previewData[1]);
  });

  it('should remove level details from the levelDetails state when removeLevelDetails is called ' +
      'with the details of the level to be removed', () => {
    wrapper.setState({
      levelsDetails: previewData,
    });
    const props = {
      updateCounter: jest.fn(),
    };
    wrapper.setProps(props);
    const levelData = {
      level: previewData[0].level,
      id: previewData[0].nameObj[0].id,
    };
    expect(wrapper.state().levelsDetails[0].nameObj).toHaveLength(2);
    wrapper.instance().removeLevelDetails(levelData);
    expect(wrapper.state().levelsDetails[0].nameObj).toHaveLength(1);
  });
});