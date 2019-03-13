import React from 'react';
import { shallow } from 'enzyme';
import BuildingSetup from '../../../src/components/setup/BuildingLevel';

describe('building setup component', () => {
  let wrapper;
  let button;

  beforeEach(() => {
    wrapper = shallow(<BuildingSetup />);
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
    expect(levelDescription.text()).toContain('Levels can be Buildings, Blocks, Floors, Wings, Rooms, etc');
  });

  it('renders with a list of level add options', () => {
    const levelAddOptions = wrapper.find('.levels-add-options');
    const optionsList = wrapper.find('.form-options-list');
    const option = wrapper.find('.form-option');
    expect(levelAddOptions).toHaveLength(1);
    expect(optionsList).toHaveLength(1);
    expect(option).toHaveLength(2);
  });

  it('renders with form, 3 input fields and 2 buttons', () => {
    const form = wrapper.find('form');
    const input = wrapper.find('Input');
    button = wrapper.find('.level-form Button');
    expect(form).toHaveLength(1);
    expect(input).toHaveLength(3);
    expect(button).toHaveLength(2);
  });

  it('renders with preview area, walking icon, heading, subheading and buttons', () => {
    const previewArea = wrapper.find('.preview-area');
    const heading = wrapper.find('.preview-area h4');
    const subHeading = wrapper.find('.preview-area p').first();
    const walkingIcon = wrapper.find('.preview-area img');
    button = wrapper.find('.preview-area Button');
    expect(previewArea).toHaveLength(1);
    expect(walkingIcon).toHaveLength(1);
    expect(heading.text()).toContain('Preview your structure');
    expect(subHeading.text()).toContain('Click any level to expand');
    expect(button).toHaveLength(2);
  });

  it('calls handleInputChange to capture data on input field and update state', () => {
    expect(wrapper.state().building).toBe('');
    const event = {
      target: { name: 'building', value: 'epic tower' },
    };
    wrapper.find('#level-input-1').simulate('change', event);
    expect(wrapper.state().building).toBe('epic tower');
  });
});
