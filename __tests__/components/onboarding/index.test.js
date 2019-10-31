import React from 'react';
import { shallow } from 'enzyme';
import { AddroomsDesign } from '../../../src/components/onboarding/addRooms/index';


const props = {
  onBoarding: jest.mock('../../../src/containers/OnboardingLayout', () => ({
    layoutLeft: jest.fn(),
    layoutRight: '<p>Hello bro</p>',
  })),
};

describe('Add room design', () => {
  const component = shallow(<AddroomsDesign {...props} />);
  it('should render with succesfully', () => {
    expect(component).toMatchSnapshot();
  });
});
