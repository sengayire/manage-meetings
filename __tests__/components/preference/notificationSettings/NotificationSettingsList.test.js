import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import GET_NOTIFICATION_STATUS from '../../../../src/graphql/queries/Preferences';
import NotificationSettingList from '../../../../src/components/preference/notificationsSettings/NotificationSettingsList';

describe('NotificationsList Component', () => {
  const mocks = [
    {
      request: { query: GET_NOTIFICATION_STATUS },
      result: {
        data: {
          getUserNotificationSettings: [
            {
              id: '1',
              userId: 17,
              deviceHealthNotification: true,
              meetingUpdateNotification: true,
            },
          ],
        },
      },
    },
  ];

  const setup = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <NotificationSettingList />
    </MockedProvider>
  );

  const wrapper = mount(setup);

  it('renders correctly from memory', () => {
    expect(shallow(<NotificationSettingList />)).toMatchSnapshot();
  });

  it('Should render <NotificationsSettingsList />', async () => {
    await wait(0); // Wait a tick to get past the loading state
    expect(wrapper.text()).toContain('Notification SettingsMeeting Notifications');
  });

  it('should show error UI', async () => {
    const errorMock = [
      {
        request: { query: GET_NOTIFICATION_STATUS },
        error: new Error('Error :('),
      },
    ];

    const errorSetup = (
      <MockedProvider mocks={errorMock} addTypename={false}>
        <NotificationSettingList />
      </MockedProvider>
    );
    const errorWrapper = mount(errorSetup);

    await wait(0); // wait for response
    expect(errorWrapper.text()).toContain('An error occurred, cannot fetch data');
  });
});
