import React from 'react';
import RoomSetup from './RoomSetup';
import SetupNavbar from '../components/setup/SetupNavbar';

/* Styles */
import '../assets/styles/roomSetup.scss';

const RoomSetupOverView = () => (
  <div className="setup-main-container">
    <SetupNavbar />
    <RoomSetup />
  </div>
);

export default RoomSetupOverView;
