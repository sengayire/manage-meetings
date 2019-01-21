import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import NotificationSetting from './NotificationSetting';
import UPDATE_NOTIFICATION_MUTATION from '../../../graphql/mutations/Preferences';

/**
 * Component that shows notification to users
 *
 * @returns {JSX}
 */
class DeviceNotifications extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    device: PropTypes.bool.isRequired,
  };
  state = {
    switchToggle: this.props.device,
  };

  render() {
    const { title, body } = this.props;
    const { switchToggle } = this.state;
    return (
      <Mutation mutation={UPDATE_NOTIFICATION_MUTATION}>
        {mutate => (
          <NotificationSetting
            title={title}
            body={body}
            toggle={switchToggle}
            handleChange={() => {
              const toggle = switchToggle;
              this.setState({ switchToggle: !toggle }, () => {
                mutate({ variables: { device: this.state.switchToggle } });
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default DeviceNotifications;
