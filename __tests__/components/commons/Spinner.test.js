import React from 'react';
import { shallow } from 'enzyme';
import Spinner, { SmallSpinner } from '../../../src/components/commons/Spinner';

describe('the Spinner renders crashing', () => {
  const wrapper = shallow(<Spinner />);
  const smallSpinner = shallow(<SmallSpinner />);
  it('should render the spinner without crashing ', () => {
    expect(wrapper.length).toBeTruthy();
  });

  it('should have div with class small ', () => {
    const smallDiv = smallSpinner.find(('.small'));
    expect(smallDiv.length).toBe(1);
  });
});
