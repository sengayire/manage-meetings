import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import UPDATE_NOTIFICATION_MUTATION from '../../../../src/graphql/mutations/Preferences';
import DeviceNotifications from '../../../../src/components/preference/notificationsSettings/DeviceNotifications';

describe('Toggle True NotificationSetting Component', () => {
  const mocks = [
    {
      request: {
        query: UPDATE_NOTIFICATION_MUTATION,
        variables: { device: true },
      },
      result: {
        data: {
          updateNotification: {
            notification: {
              id: '1',
              userId: 17,
              meetingUpdateNotification: true,
              deviceHealthNotification: true,
            },
          },
        },
      },
    },
  ];

  const props = {
    title: 'Meeting Notifications',
    body: 'some',
    device: false,
  };
  const falseProps = {
    title: 'Meeting Notifications',
    body: 'some',
    device: true,
  };

  const setup = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeviceNotifications {...props} />
    </MockedProvider>
  );

  const wrapper = mount(setup);

  it('Should toggle True', async () => {
    const switchBtn = wrapper.find('NotificationSetting');
    switchBtn.props().handleChange();
    await wait(0);
    wrapper.update();
    expect(wrapper.text()).toContain('Meeting Notificationssome');
  });

  it('Should toggle False', async () => {
    const falseMocks = [
      {
        request: {
          query: UPDATE_NOTIFICATION_MUTATION,
          variables: { device: false },
        },
        result: {
          data: {
            updateNotification: {
              notification: {
                id: '1',
                userId: 17,
                meetingUpdateNotification: true,
                deviceHealthNotification: false,
              },
            },
          },
        },
      },
    ];

    const falseSetup = (
      <MockedProvider mocks={falseMocks} addTypename={false}>
        <DeviceNotifications {...falseProps} />
      </MockedProvider>
    );
    const falseWrapper = mount(falseSetup);
    const switchBtn = falseWrapper.find('NotificationSetting');
    switchBtn.props().handleChange();
    await wait(0);
    falseWrapper.update();
    expect(falseWrapper.text()).toContain('Meeting Notificationssome');
  });

  it('renders correctly from memory', () => {
    expect(shallow(<DeviceNotifications {...props} />)).toMatchSnapshot();
  });
  it('renders correctly from memory again', () => {
    expect(shallow(<DeviceNotifications {...falseProps} />)).toMatchSnapshot();
  });
});
