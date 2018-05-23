import React from 'react';

class SettingsNav extends React.Component {
  render() {
    return (
      <div className="settings-tabs">
        <ul>
          <li className="active">Offices</li>
          <li>Room</li>
          <li>Room Resources</li>
          <li>People</li>
          <li>Devices</li>
          <li>Integrations</li>
        </ul>
      </div>
    );
  }
}

export default SettingsNav;
