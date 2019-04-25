import React from 'react';
import { mount } from 'enzyme';
import SetupLevel from '../../../src/components/setup/SetupLevel';

describe('unit test for setup level component', () => {
  const handleClick = () => jest.fn();
  const state = {
    carouselPage: true,
  };

  const wrapper = mount(<SetupLevel handleClick={handleClick} />);
  wrapper.instance().setState(state);

  it('should render setup_carousel with a length of 1', () => {
    const carousel = wrapper.find('.setup_carousel');
    expect(carousel).toHaveLength(1);
  });

  it('should render a previous and next button for the carousel with a length of 1', () => {
    const previousButton = wrapper.find('.setup_carousel_previous');
    expect(previousButton).toHaveLength(1);
    const nextButton = wrapper.find('.setup_carousel_next');
    expect(nextButton).toHaveLength(1);
  });

  it('should render illustration_two carousel with a length of 1 when the next button is clicked', () => {
    const nextButton = wrapper.find('.setup_carousel_next');
    nextButton.simulate('click');
    expect(wrapper.state().carouselPage).toBe(false);
    expect(wrapper.find('.three')).toHaveLength(0);
    expect(wrapper.find('.illustration_two')).toHaveLength(2);
  });

  it('should change the class in the carousel to three and render with a length of 1 when the previous button is clicked', () => {
    const previousButton = wrapper.find('.setup_carousel_previous');
    previousButton.simulate('click');
    expect(wrapper.state().carouselPage).toBe(true);
    expect(wrapper.find('.illustration_two')).toHaveLength(0);
    expect(wrapper.find('.three')).toHaveLength(1);
  });
});
