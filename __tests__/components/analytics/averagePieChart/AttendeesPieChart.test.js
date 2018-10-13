import React from 'react';
import { shallow } from 'enzyme';
import AttendeesPieChart from '../../../../src/components/analytics/averagePieChart/AttendeesPieChart';

describe('Attendees Pie Chart Component', () => {
  const wrapper = shallow(<AttendeesPieChart />);
  it('renders correctly from memory', () => {
    expect(shallow(<AttendeesPieChart />)).toMatchSnapshot();
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
