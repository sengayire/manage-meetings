import React from 'react';
import { mount } from 'enzyme';
import BuildingSetup from '../../../src/components/setup/BuildingLevel';

describe('building setup component', () => {
  it('Should check that the child level is valid ', () => {
    mount(<BuildingSetup />);
  });
});
