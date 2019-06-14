import React from 'react';
import { shallow } from 'enzyme';
import Device from '../../../src/components/devices/Device';
import deviceData from '../../../__mocks__/deviceData';

describe('Device Component', () => {
  let wrapper;
  const handleAction = jest.fn();

  beforeAll(() => {
    wrapper = shallow(<Device
      device={deviceData}
      handleAction={handleAction}
    />);
  });
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls functions for edit', () => {
    wrapper.find('IconButtons').at(0).dive().find('button')
      .simulate('click');
    expect(handleAction).toHaveBeenLastCalledWith('edit', deviceData);
  });

  // it('calls functions for delete', () => {
  //   wrapper.find('IconButtons').at(1).dive().find('button')
  //     .simulate('click');
  //   expect(handleAction).toHaveBeenLastCalledWith('delete', deviceData);
  // });
});
