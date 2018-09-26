import React from 'react';
import { shallow } from 'enzyme';
import NotificationSettingList from '../../../../src/components/preference/notificationsSettings/NotificationSettingsList';

describe('NotificationsList Component', () => {
  it('renders correctly from memory', () => {
    expect(shallow(<NotificationSettingList />)).toMatchSnapshot();
  });
});
