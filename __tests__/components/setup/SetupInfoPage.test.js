import React from 'react';
import { mount } from 'enzyme';
import SetupInfoPage from '../../../src/components/setup/SetupInfoPage';

describe('Admin setup info component', () => {
  const handleClick = () => jest.fn();
  const state = {
    carouselPage: true,
  };

  const wrapper = mount(<SetupInfoPage handleClick={handleClick} />);
  wrapper.instance().setState(state);

  it('should have an instance of the setup_carousel class when the component renders', () => {
    const carousel = wrapper.find('.setup_carousel');
    expect(carousel).toHaveLength(1);
  });

  it('should have a previous and next button for the carousel', () => {
    const previousButton = wrapper.find('.setup_carousel_previous');
    expect(previousButton).toHaveLength(1);
    const nextButton = wrapper.find('.setup_carousel_next');
    expect(nextButton).toHaveLength(1);
  });

  it('should change the class in the carousel to illustration_two when the next button is clicked', () => {
    const nextButton = wrapper.find('.setup_carousel_next');
    nextButton.simulate('click');
    expect(wrapper.state().carouselPage).toBe(false);
    expect(wrapper.find('.three')).toHaveLength(0);
    expect(wrapper.find('.illustration_two')).toHaveLength(1);
  });

  it('should change the class in the carousel to three when the previous button is clicked', () => {
    const previousButton = wrapper.find('.setup_carousel_previous');
    previousButton.simulate('click');
    expect(wrapper.state().carouselPage).toBe(true);
    expect(wrapper.find('.illustration_two')).toHaveLength(0);
    expect(wrapper.find('.three')).toHaveLength(1);
  });

  it('should change the carouselPage state to true when the continue button is clicked', () => {
    const continueButton = wrapper.find('.setup_continue_button');
    continueButton.simulate('click');
    expect(wrapper.state().carouselPage).toBe(true);
  });
});
