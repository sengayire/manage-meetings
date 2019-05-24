import React from 'react';
import { shallow } from 'enzyme';
import ExportButton from '../../../src/components/commons/ExportButton';
import allAnalyticsMockData from '../../../__mocks__/analytics/allAnalyticsMockData';

describe('Unit test for the ExportButton functional component', () => {
  it('should render a DropDown component', () => {
    const props = {
      data: {
        analytics: allAnalyticsMockData.analytics,
        dateValue: {
          startDate: '',
          endDate: '',
        },
      },
    };
    const wrapper = shallow(<ExportButton {...props} />);
    expect(wrapper.find('Dropdown').length).toEqual(1);
  });
});
