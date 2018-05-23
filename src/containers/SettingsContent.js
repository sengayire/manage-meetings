import React from 'react';
import SettingsNav from '../components/SettingsNav';
import OfficeList from '../components/OfficeList';
import '../assets/styles/settingscontent.scss';

class SettingsContent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="settings-vertical">
        <SettingsNav />
        <OfficeList />
      </div>
    );
  }
}

export default SettingsContent;
