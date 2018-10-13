import React from 'react';
import { shallow } from 'enzyme';
import AveragePieChartList from '../../../../src/components/analytics/averagePieChart/AveragePieChartList';

describe('Average Pie Chart Component', () => {
  it('renders correctly from memory', () => {
    expect(shallow(<AveragePieChartList />)).toMatchSnapshot();
  });
});
