import React from 'react';
import { shallow } from 'enzyme';

import Resource from '../../src/components/Resource';

describe('Tests for Resource Component', () => {
  const resource = {
    name: 'ResourceName',
    rooms: 8,
  };

  const shallowWrapper = shallow(<Resource resource={resource} doDelete={() => {}} />);

  it('renders correctly from memory', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
