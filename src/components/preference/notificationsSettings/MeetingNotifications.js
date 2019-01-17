import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import NotificationSetting from './NotificationSetting';
import UPDATE_NOTIFICATION_MUTATION from '../../../graphql/mutations/Preferences';

/**
 * Component that shows notifications related to meetings
 *
 * @returns {JSX}
 */
class MeetingNotifications extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    meeting: PropTypes.bool.isRequired,
  };
  state = {
    switchToggle: this.props.meeting,
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
                mutate({ variables: { meeting: this.state.switchToggle } });
              });
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default MeetingNotifications;
