import React from 'react';
import { shallow } from 'enzyme';

import Resource from '../../src/components/Resource';
import { DeleteResource } from '../../src/components/DeleteResource';
import data from '../../__mocks__/data';


describe('Tests for Resource Component', () => {
  const shallowWrapper = shallow(<Resource resource={data.resource} doDelete={() => {}} />);

  it('renders correctly from memory', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
  it('should render the `DeleteResource`', () => {
    expect(shallowWrapper.find(DeleteResource)).toHaveLength(1);
  });
});
