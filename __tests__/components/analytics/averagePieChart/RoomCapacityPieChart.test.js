import React from 'react';
import { shallow } from 'enzyme';
import RoomCapacityPieChart from '../../../../src/components/analytics/averagePieChart/RoomCapacityPieChart';

describe('Room Capacity Pie Chart Component', () => {
  const wrapper = shallow(<RoomCapacityPieChart />);
  it('renders correctly from memory', () => {
    expect(shallow(<RoomCapacityPieChart />)).toMatchSnapshot();
  });
  it('should be able to hover', () => {
    const helpIcon = wrapper.find('img[alt="help icon"]');
    const nativeEvent = { nativeEvent: { clientX: 300, clientY: 250 } };
    helpIcon.simulate('mouseenter', nativeEvent);
    expect(wrapper).toMatchSnapshot();
    helpIcon.simulate('mouseleave', nativeEvent);
    expect(wrapper).toMatchSnapshot();
  });
});
