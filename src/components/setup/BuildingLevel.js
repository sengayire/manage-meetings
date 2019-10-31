import React from 'react';
import SetupLayout from '../../containers/SetupLayout';
import SetupLocationPreview from '../../components/setup/meetingRooms/SetupLocationPreview';
import RoomsStructurePreview from './meetingRooms/RoomsStructurePreview';
import SetupLocation from './meetingRooms/SetupLocation';

const BuildingLevel = () =>
  (<SetupLayout
    layoutRight={<SetupLocationPreview content={<RoomsStructurePreview />} />}
    layoutLeft={<SetupLocation />}
  />);

export default BuildingLevel;

