import React from 'react';
import { shallow } from 'enzyme';
import DonutChart from '../../../../src/components/analytics/checkins/DonutChart';
import ErrorIcon from '../../../../src/components/commons/ErrorIcon';

describe('Checkins component', () => {
  let props;
  let wrapper;

  props = { tip: '', loading: false };
  wrapper = shallow(<DonutChart {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a doughnut chart', () => {
    expect(wrapper.find('.diagram')).toHaveLength(1);
  });

  it('should render properly when loading', () => {
    props = { tip: '', loading: true };
    const wrapperLoading = shallow(<DonutChart {...props} />);
    expect(wrapperLoading.find('.chart-spinner')).toHaveLength(1);
  });

  it('should render properly when an error occurs', () => {
    props = { tip: '', error: {} };
    const wrapperError = shallow(<DonutChart {...props} />);
    expect(wrapperError.find(ErrorIcon)).toHaveLength(1);
  });

  it('should display the cancellations doughnut chart properly', () => {
    props = { tip: '', hasInfo: false };
    wrapper = shallow(<DonutChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
