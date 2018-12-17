import React from 'react';
import { shallow } from 'enzyme';
import QueryAnalyticsLoading from '../../../../src/components/analytics/AverageMeetingList/QueryAnalyticsLoading';

describe('QueryAnalyticsLoading component', () => {
  const wrapper = shallow(<QueryAnalyticsLoading />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
