import React from 'react';
import { shallow } from 'enzyme';
import TheCrestInputs from '../../../src/components/commons/TheCrestInputs';

describe('TheCrestInputs component', () => {
  const onChange = jest.fn();
  const wrapper = shallow(<TheCrestInputs
    roomName=""
    roomFloor={0}
    floorOptionsList={[]}
    roomCapacity={1}
    handleInputChange={onChange}
  />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
