import React from 'react';
import { mount } from 'enzyme';


import InsightsDropdown from '../../../../src/components/insights/insightsComponents/insightsDropdown';

const setStartDate = jest.fn(() => '10 03 2019');
const props = {
  setStartDate,
  date: {
    oneWeekAgo: '09 25 2019',
    oneMonthAgo: '09 05 2019',
    oneQuaterAgo: '07 05 2019',
  },
};
describe('InsightsDropdown component', () => {
  const component = mount(<InsightsDropdown {...props} />);
  it('snapshot renders', () => {
  });
  expect(component.find('Dropdown').length).toEqual(1);
});
