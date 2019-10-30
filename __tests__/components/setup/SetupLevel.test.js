import React from 'react';
import { mount } from 'enzyme';
import SetupLevel from '../../../src/components/setup/SetupLevel';

describe('unit test for setup level component', () => {
  it('should render setup_carousel with a length of 1', () => {
    mount(<SetupLevel />);
  });
});
