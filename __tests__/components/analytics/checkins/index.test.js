import React from 'react';
import { shallow } from 'enzyme';
import Checkins from '../../../../src/components/analytics/checkins';

describe('Checkins component', () => {
  const wrapper = shallow(<Checkins />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

