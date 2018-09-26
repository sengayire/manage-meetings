import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-toolbox/lib/switch';
import '../../../assets/styles/notificationSettingsList.scss';

/**
 * will render a single notification setting card
 */
class NotificationSetting extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  };
  state = {
    switchToggle: false,
  };

  /**
   * handle toggle switch component
   */
  handleChange = () => {
    const toggle = this.state.switchToggle;
    this.setState({ switchToggle: !toggle });
  };
  render() {
    return (
      <div className="notification-container">
        <section className="notification-content">
          <h2 className="notification-title">{this.props.title}</h2>
          <p>{this.props.body}</p>
        </section>
        <section className="notification-switch">
          <Switch
            className="switch-component"
            checked={this.state.switchToggle}
            onChange={this.handleChange}
          />
        </section>
      </div>
    );
  }
}

export default NotificationSetting;
