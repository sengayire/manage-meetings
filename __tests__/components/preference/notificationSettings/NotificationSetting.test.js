import React from 'react';
import { shallow } from 'enzyme';
import NotificationSetting from '../../../../src/components/preference/notificationsSettings/NotificationSetting';

describe('NotificationSetting Component', () => {
  it('renders correctly from memory', () => {
    expect(shallow(<NotificationSetting
      title="Meeting Notifications"
      body="some"
      toggle={false}
      handleChange={() => ''}
    />)).toMatchSnapshot();
  });
});
