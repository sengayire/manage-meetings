import React from 'react';
import { shallow } from 'enzyme';

import NotificationSettings from '../../../../src/components/preference/notificationsSettings/NotificationSettingsList';

describe('Notification Settings Component', () => {
  const wrapper = shallow(<NotificationSettings />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
