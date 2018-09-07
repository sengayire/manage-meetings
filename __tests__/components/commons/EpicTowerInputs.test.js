import React from 'react';
import { shallow } from 'enzyme';
import EpicTowerInputs from '../../../src/components/commons/EpicTowerInputs';

describe('ActionButton component', () => {
  const onChange = jest.fn();
  const wrapper = shallow(<EpicTowerInputs
    roomName=""
    roomFloor={0}
    floorOptions={[]}
    roomCapacity={0}
    roomWing={0}
    wingOptions={[]}
    handleInputChange={onChange}
  />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
