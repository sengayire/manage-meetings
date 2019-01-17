import React from 'react';
import Switch from 'react-toolbox/lib/switch';
import PropTypes from 'prop-types';
import '../../../assets/styles/notificationSettingsList.scss';

/**
 * will render a single notification setting card
 *
 * @param {Object} notificationSettingsObject
 *
 * @returns {JSX}
 *
 */
const NotificationSetting = ({
  title, body, toggle, handleChange,
}) => (
  <div className="notification-container">
    <section className="notification-content">
      <h2 className="notification-title">{title}</h2>
      <p>{body}</p>
    </section>
    <section className="notification-switch">
      <Switch
        id="switchBtn"
        className="switch-component"
        checked={toggle}
        onChange={handleChange}
      />
    </section>
  </div>
);

NotificationSetting.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  toggle: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NotificationSetting;
