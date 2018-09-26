import React from 'react';
import { shallow } from 'enzyme';
import NotificationSetting from '../../../../src/components/preference/notificationsSettings/NotificationSetting';
import notificationData from '../../../../__mocks__/preference/notificationSettings/notificationData';

describe('NotificationSetting Component', () => {
  const notificationSettingWrapper = shallow(<NotificationSetting
    title={notificationData.title}
    body={notificationData.body}
  />);
  it('should render without crashing', () => {
    expect(shallow(<NotificationSetting
      title={notificationData.title}
      body={notificationData.body}
    />)).toMatchSnapshot();
  });
  it('should have initial state', () => {
    expect(notificationSettingWrapper.state('switchToggle')).toEqual(false);
  });
  it('should be able to toggle', () => {
    const spanToggle = notificationSettingWrapper.find('.switch-component');
    spanToggle.simulate('change');
    expect(notificationSettingWrapper.state('switchToggle')).toEqual(true);
  });
});
