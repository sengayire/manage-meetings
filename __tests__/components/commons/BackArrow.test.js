import React from 'react';
import { shallow } from 'enzyme';
import BackArrow from '../../../src/components/commons/BackArrow';

const initProps = {
  redirectUri: '',
};

describe('Back Arrow Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BackArrow {...initProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
