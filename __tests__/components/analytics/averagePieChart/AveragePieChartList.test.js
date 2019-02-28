import React from 'react';
import { shallow } from 'enzyme';
import AveragePieChartList from '../../../../src/components/analytics/averagePieChart/AveragePieChartList';

describe('Average Pie Chart Component', () => {
  const props = {
    queryCompleted: jest.fn(),
    dateValue: {
      validatedStartDate: '',
      validatedEndDate: '',
    },
  };
  it('renders correctly from memory', () => {
    expect(shallow(<AveragePieChartList {...props} />)).toMatchSnapshot();
  });
});
