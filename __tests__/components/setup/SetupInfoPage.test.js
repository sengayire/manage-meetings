import React from 'react';
import { shallow } from 'enzyme';
import SetupInfoPage from '../../../src/components/setup/SetupInfoPage';

describe('Admin setup info component', () => {
  const props = {
    handleClick: jest.fn(),
  };
  const wrapper = shallow(<SetupInfoPage {...props} />);

  it('should render a welcome message header', () => {
    const WelcomeMessage = wrapper.find('.welcome__message').text();
    expect(WelcomeMessage.trim()).toEqual('Welcome to Room Setup');
  });

  it('should call handleClick with "BuildingLevel" as the parameter when the continue button is clicked', () => {
    const spy = jest.spyOn(props, 'handleClick');
    const continueButton = wrapper.find('[title="Continue"]');
    continueButton.simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('BuildingLevel');
  });
});
