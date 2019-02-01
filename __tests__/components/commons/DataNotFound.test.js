import React from 'react';
import { shallow } from 'enzyme';
import DataNotFound from '../../../src/components/commons/DataNotFound';

describe('Error component', () => {
  const wrapper = shallow(<DataNotFound />);

  it('should render the error component crashing ', () => {
    expect(wrapper.length).toBeTruthy();
  });
});
