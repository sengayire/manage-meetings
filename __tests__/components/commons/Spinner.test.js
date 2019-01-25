import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../src/components/commons/Spinner';

describe('the Spinner renders crashing', () => {
  const wrapper = shallow(<Spinner />);
  it('should render the spinner without crashing ', () => {
    expect(wrapper.length).toBeTruthy();
  });
});
