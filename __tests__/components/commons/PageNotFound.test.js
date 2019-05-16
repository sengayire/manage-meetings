import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../../src/containers/PageNotFound';
import NotFound from '../../../src/components/commons/NotFound';

describe('the Spinner renders crashing', () => {
  const wrapper = shallow(<NotFound />);
  const component = shallow(<PageNotFound />);
  it('should render the pageNot Found component without crashing ', () => {
    expect(wrapper.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });
});
