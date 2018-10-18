import React from 'react';
import { mount } from 'enzyme';
import AverageMeetingList from '../../../src/components/analytics/AverageMeetingList';

describe('AverageMeetingList component', () => {
  const wrapper = mount(<AverageMeetingList />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('', () => {
    wrapper.find('#next').at(0).simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
