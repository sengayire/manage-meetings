import React from 'react';
import { shallow } from 'enzyme';
import LocationInput from '../../../src/components/roomFeedback/LocationInput';


describe('Location Input', () => {
  it('should render location input', () => {
    const wrapper = shallow(<LocationInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
