import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsOverview from '../../src/containers/AnalyticsOverview';

describe('Analytics Overview Component', () => {
  it('renders correctly from memory', () => {
    const props = {
      queryCompleted: jest.fn(),
      dateValue: {
        startDate: '',
        endDate: '',
      },
    };
    expect(shallow(<AnalyticsOverview {...props} />)).toMatchSnapshot();
  });
});
