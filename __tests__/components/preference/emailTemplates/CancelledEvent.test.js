import React from 'react';
import { shallow } from 'enzyme';

import CancelledEvent from '../../../../src/components/preference/emailTemplates/CancelledEvent';

describe('Cancelled Event Component', () => {
  const wrapper = shallow(<CancelledEvent />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
