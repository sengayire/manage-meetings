import React from 'react';
import { shallow } from 'enzyme';
import DonutChart from '../../../../src/components/analytics/checkins/DonutChart';
import ErrorIcon from '../../../../src/components/commons/ErrorIcon';

describe('Checkins component', () => {
  let props;
  let wrapper;

  props = { tip: '', loading: false, isFutureDateSelected: false };
  wrapper = shallow(<DonutChart {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a doughnut chart', () => {
    expect(wrapper.find('.diagram')).toHaveLength(1);
  });

  it('should render properly when loading', () => {
    props = { tip: '', loading: true, isFutureDateSelected: false };
    const wrapperLoading = shallow(<DonutChart {...props} />);
    expect(wrapperLoading.find('Overlay')).toHaveLength(1);
  });

  it('should render properly when loading', () => {
    wrapper.setProps({ isFutureDateSelected: true });
    expect(wrapper.find(ErrorIcon)).toHaveLength(1);
  });

  it('should render properly when an error occurs', () => {
    props = { tip: '', error: { graphQLErrors: [{ message: 'this error occurred' }] }, isFutureDateSelected: false };
    const wrapperError = shallow(<DonutChart {...props} />);
    expect(wrapperError.find(ErrorIcon)).toHaveLength(1);
  });

  it('should display the cancellations doughnut chart properly', () => {
    props = { tip: '', hasInfo: false, isFutureDateSelected: false };
    wrapper = shallow(<DonutChart {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
