import React from 'react';
import { shallow } from 'enzyme';
import PlaceHolder from '../../../src/components/commons/Placeholder';

describe('PlaceHolder componenent', () => {
  it('should renders correctly', () => {
    expect(shallow(<PlaceHolder />)).toMatchSnapshot();
  });
});
